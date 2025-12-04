// English translations
export const translations = {
  // Common
  loading: 'Loading...',
  error: 'Error',
  success: 'Success',
  cancel: 'Cancel',
  submit: 'Submit',
  close: 'Close',
  edit: 'Edit',
  delete: 'Delete',
  save: 'Save',
  back: 'Back',

  // Navigation
  dashboard: 'Dashboard',
  manageProfile: 'Manage Profile',
  dataInput: 'Data Input',
  logout: 'Logout',

  // Dashboard
  customerPriority: 'Customer Priority',
  callStatus: 'Call Status',
  interestStatus: 'Interest Status',
  searchCustomer: 'Search customer...',
  priority: 'Priority',
  customerName: 'Customer Name',
  phone: 'Phone Number',
  callStatusLabel: 'Call Status',
  interestStatusLabel: 'Interest Status',
  detailCustomer: 'Customer Details',
  note: 'Note',
  addNote: 'Add Note',
  saveNote: 'Save Note',

  // Manage Profile
  salesAccount: 'Sales Account',
  newAccount: 'New Account',
  accountList: 'Account List',
  addNewSales: 'Add New Sales',

  // Data Input
  uploadFile: 'Upload File',
  dragDropFile: 'Drag & drop file here or click to select',
  submitScoring: 'Submit Scoring',
  filePreview: 'File Preview',
  scoring: 'Scoring...',

  // Login Page
  loginWelcome: 'Welcome Back',
  loginSubtitle: 'Sign in to your account to continue',
  emailLabel: 'Email Address',
  emailPlaceholder: 'you@example.com',
  passwordLabel: 'Password',
  passwordPlaceholder: '••••••••',
  rememberMe: 'Remember me',
  forgotPassword: 'Forgot password?',
  signIn: 'Sign In',
  processing: 'Processing...',
  errorRequired: 'Email and password are required',
  errorFailed: 'Login failed, please try again',
  termsPrefix: 'By signing in, you agree to our',
  terms: 'Terms & Conditions',
  and: 'and',
  privacy: 'Privacy Policy',
  
  // Branding
  brandName: 'LeadScore',
  brandTitle: 'Lead Scoring System',
  brandDesc: 'Intelligent platform for bank deposit prediction with advanced Machine Learning.',
  feature1Title: 'Accurate & Real-time',
  feature1Desc: 'AI-powered predictions with current economic data',
  feature2Title: 'User-Friendly',
  feature2Desc: 'Intuitive dashboard for Sales Heads & Agents',
  feature3Title: 'Deep Insights',
  feature3Desc: 'Comprehensive analytics for campaign strategy',
  poweredBy: 'Powered by Advanced Machine Learning',
  demoLabel: 'Demo Credentials',
};

export const getTranslation = (key, language = 'en') => {
  return translations[key] || key;
};
