import ChangePassword from "../../components/me/ChangePassword";
import Container from "../../components/common/Container";
import type { NextPage } from "next";
import Section from "../../components/common/Section";

const Me: NextPage = () => {
  return (
    <Container>
      <Section title="Change Password">
        <ChangePassword />
      </Section>
    </Container>
  );
};

export default Me;
