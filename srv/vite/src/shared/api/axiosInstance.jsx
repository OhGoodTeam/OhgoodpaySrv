import axios from "axios";
import callToken from "../hook/callToken";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://ohgoodteam.shinhanacademy.co.kr",
  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 응답 오류 처리
    if (
      error.response &&
      (error.response.status === 401 ||
        (error.response && error.response.status === 403))
    ) {
      console.error("인증 오류: 토큰이 유효하지 않거나 만료되었습니다.");
      sessionStorage.removeItem("accessToken"); // 토큰 제거

      // if (!isProfileEditRequest && window.location.pathname !== "/login") {
      //   window.location.href = "/login"; // 로그인 페이지로 리디렉션
      // }
      if (window.location.pathname !== "/login") {
        window.location.href = "/login"; // 로그인 페이지로 리디렉션
      }
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  async (config) => {
    // public API나 auth 관련 API는 토큰 없이 요청
    console.log("config.url:", config.url);
    if (
      config.url.startsWith("/auth") ||
      (config.url.startsWith("/api/public") &&
        !config.url.startsWith("/api/public/shorts/feeds"))
    ) {
      return config;
    }

    try {
      const token = await callToken();
      console.log("config.url:", config.url);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        if (config.url.includes("/api/public/shorts")) {
          return config;
        }

        // 토큰이 없으면 로그만 출력하고 요청을 계속 진행
        // 서버에서 401을 반환하면 응답 인터셉터에서 처리
        console.warn("토큰이 없습니다. 서버에서 인증을 확인합니다.");
        // 프로필 수정 관련 요청은 자동 리다이렉트하지 않음

        if (window.location.pathname !== "/login") {
          window.location.href = "/login"; // 로그인 페이지로 리디렉션
          return config;
        }
      }
    } catch (error) {
      console.error("토큰 처리 중 오류 발생:", error);
      // 토큰 처리 에러가 발생해도 요청을 계속 진행
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
