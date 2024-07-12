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
} from "@react-email/components";

interface ProblemSetterResultEmail {
  username: string;
  fianalResult: string;
  boolresult: boolean;
}

export default function VerificationEmail({
  username,
  fianalResult,
  boolresult,
}: ProblemSetterResultEmail) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>OJ Problem Setter Result</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Section>
        <Row>
          <Heading as="h2">Hello {username},</Heading>
        </Row>
        <Row>
          <Text>{fianalResult}</Text>
        </Row>
        <Row>
          {boolresult === true ? (
            <Text>
              Welcome to the team! Together, let&apos;s elevate the challenges
              of our problems and make the OJ platform an even better place for
              everyone.
            </Text>
          ) : (
            <Text>
              Unfortunately, your application was not successful this time, but
              don&apos;t lose hope—keep honing your skills and try again!
            </Text>
          )}
        </Row>
        <Row>
          <Button
            href={`https://oj-sigma.vercel.app/`}
            style={{ color: "#61dafb" }}
            className="text-xl font-bold"
          >
            Visit here
          </Button>
        </Row>
      </Section>
    </Html>
  );
}
