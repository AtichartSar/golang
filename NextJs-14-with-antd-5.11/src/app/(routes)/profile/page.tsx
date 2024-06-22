import ProfileForm from "./components/ProfileForm";

type Props = {};

const Page = (props: Props) => {
  console.log("admin");

  return (
    <div>
      <p>Profile</p>
      <ProfileForm />
    </div>
  );
};

export default Page;
