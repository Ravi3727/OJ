import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const dirCodes = path.join(process.cwd(), 'codes');
const outputPath = path.join(process.cwd(), 'outputs');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const generateFile = async (format: string, content: string): Promise<string> => {
    const jobID = uuid();
    const filename = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, filename);
    await fs.promises.writeFile(filePath, content);
    return filePath;
};

const executeCpp = (filepath: string): Promise<string> => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject) => {
        exec(
            `g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
};

const executePython = (filepath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(`python ${filepath}`, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            }
            if (stderr) {
                reject(stderr);
            }
            resolve(stdout);
        });
    });
};

const executeJava = (filepath: string): Promise<string> => {
    const jobId = "Main"; // Assuming jobId should be "Main" since class name is Main
    
    return new Promise((resolve, reject) => {
        exec(
            `javac ${filepath} && java -cp ${dirCodes} ${jobId}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
};


const executeJavaScript = (filepath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(`node ${filepath}`, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            }
            if (stderr) {
                reject(stderr);
            }
            resolve(stdout);
        });
    });
};

const executeCode = async (language: string, filepath: string): Promise<string> => {
    switch (language) {
        case 'cpp':
            return await executeCpp(filepath);
            case 'c':
            return await executeCpp(filepath);
        case 'py':
            return await executePython(filepath);
        case 'java':
            return await executeJava(filepath);
        case 'js':
            return await executeJavaScript(filepath);
        default:
            throw new Error('Unsupported language');
    }
};

interface Input {
    language: string;
    code: string;
}

export async function POST(req: NextRequest) {
    const { language = 'cpp', code } = (await req.json()) as Input;
    if (!code) {
        return NextResponse.json({
            success: false,
            message: "Empty code!",
        }, { status: 404 });
    }

    try {
        const extension: { [key: string]: string } = {
            cpp: 'cpp',
            py: 'py',
            java: 'java',
            js: 'js',
            c: 'c'
        };
        
        const fileExtension = extension[language];
        if (!fileExtension) {
            return NextResponse.json({
                success: false,
                message: "Unsupported language!",
            }, { status: 400 });
        }

        const filePath = await generateFile(fileExtension, code);
        const output = await executeCode(language, filePath);
        return NextResponse.json({
            success: true,
            data : {filePath, output},
            message: "Code executed successfully"
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: error?.message || "Internal server error",
        }, { status: 500 });
    }
};
