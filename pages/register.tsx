import dynamic from 'next/dynamic';
const SignUpForm = dynamic(
  () => import('@/components/Authentication/SignUpForm')
);
const LayoutAuthen = dynamic(() => import('@/components/layouts/LayoutAuth'), {
  ssr: false,
});
const SignUp = () => {
  return (
    <LayoutAuthen type="signup" titlePage="Register">
      <SignUpForm />
    </LayoutAuthen>
  );
};
export default SignUp;
