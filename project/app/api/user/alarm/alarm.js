// 알림
export const getAlarmList = async () => {
  try {
    const atkToken = localStorage.getItem("token");
    const page = 0;

    const url = new URL("https://dev.gomin-chingu.site/user/alarm");
    url.searchParams.append("page", page);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        atk: atkToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Alarm data:", data);
      return data.result.alarmList;
    } else {
      console.error("Failed to get MyPage data:", response);
    }
  } catch (error) {
    console.error("Error", error);
  }
};
