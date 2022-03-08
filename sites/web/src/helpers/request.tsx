import { AxiosError } from "axios";

export const handleResponseError = (error: AxiosError) => {
  const status = error && error.response && error.response.status;
  switch (status) {
    case 401:
      // logout();
      console.log("401");
      break;
    case 403:
      console.log("403");
      // denyAccess();
      break;
    default:
      // Handle error message from API response
      // const code = error.response?.data?.code;
      // let message = null;

      // if (error.response && error.response.data) {
      //   const { data } = error.response;
      //   message = data?.details?.data?.message || data.message;
      // }
      // notification.error({
      //   message: `${t("Error")}: ${message || t("SomethingWentWrong")}`,
      //   description: t("SendFeedBack"),
      //   btn: (
      //     <Button onClick={() => window.open("mailto:luc.hn@teko.vn")}>
      //       {t("GoToEmail")}
      //     </Button>
      //   ),
      // });
      break;
  }
};
