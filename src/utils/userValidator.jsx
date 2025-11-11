const UserVaildator = {
  isValidId: (id) => {
    if (id.length < 2) {
      return false;
    }
    return true;
  },

  isValidPassword: (password) => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },

  isValidName: (name) => {
    if (name.length < 2) {
      return false;
    } else {
      return true;
    }
  },

  isValidEmail: (email) => {
    // 이메일 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return false;
    } else {
      return true;
    }
  },

  isValidTelephone: (telephone) => {
    // 전화번호 정규식 (예: 010-1234-5678)
    const telNoWithoutHyphens = telephone.replace(/-/g, "");

    const telNoRegex = /^\d{11}$/; // 10~11자리 숫자

    if (!telNoRegex.test(telNoWithoutHyphens)) {
      return false;
    } else {
      return true;
    }
  },
};

export default UserVaildator;
