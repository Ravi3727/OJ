import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
  } from '@react-email/components';
  
  interface FormSubmitEmail {
    username: string;
    leetCode: string;
    codeForces: string;
    codeCheaf: string;
    other: string;
  }
  
  export default function FormSubmitEmail({ leetCode, codeForces, codeCheaf, other, username }: FormSubmitEmail) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Problem Setter Application</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>UserName =  {username}</Preview>
        <Section>
        <Row>
            <Text>
              Problem setter application from OJ 
            </Text>
          </Row>
        <Row>
            <Heading as="h2">Leetcode link = <a href={leetCode}>Click here to visit Leetcode</a></Heading>
          </Row>
          <Row>
            <Heading as="h2">CodeForces link = <a href={codeForces}>Click here to visit CodeForces</a></Heading>
          </Row>
          <Row>
            <Heading as="h2">Codechef Link = <a href={leetCode}>Click here to visit Codechef</a></Heading>
          </Row>
          <Row>
            <Heading as="h2">Other Link = <a href={leetCode}>Click here to visit Other</a></Heading>
          </Row>
          
          <Row>
          {/* //TODO Adding this route */ }

            <Button
              href={`http://localhost:3000/problemSetterVerify/${username}`}
              style={{ color: '#61dafb' }}
              className='text-xl font-bold'
            >
              Verify here
            </Button>
          </Row>
        </Section>
      </Html>
    );
  }