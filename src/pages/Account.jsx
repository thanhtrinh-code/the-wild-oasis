import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserData from "../features/authentication/UpdateUserDataForm";
import UpdatePassword from "../features/authentication/UpdatePasswordForm";
function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserData/>
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePassword/> 
      </Row>
    </>
  );
}

export default Account;
