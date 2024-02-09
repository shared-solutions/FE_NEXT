export const setCookie = (cookie_name, value, days) => {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + days);

  const cookie_value = `${encodeURIComponent(value)}${
    days == null ? "" : `; expires=${exdate.toUTCString()}`
  }`;
  document.cookie = `${cookie_name}=${cookie_value}`;
};

export const getCookie = (cookie_name) => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const [name, value] = cookies[i].split("=").map((part) => part.trim());

    if (name === cookie_name) {
      return decodeURIComponent(value);
    }
  }
};
