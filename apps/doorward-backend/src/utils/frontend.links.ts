const FrontendLinks = {
  passwordReset: (resetToken: string) => `/password/reset/${encodeURIComponent(resetToken)}`,
  login: '/login',
};

export default FrontendLinks;
