import axios from "axios";
import React from "react";
function DiscordService() {
  const discordUrl = "https://discord.com/api/webhooks/1099617088223596647/l337tUSW-h6Ct7rt082nwK8Kz6K-P_do-CRfPtFfx_FY9YaLjAcyHiz5MqNRxrI6P06s";
  // const discordUrl = "https://discord.com/api/webhooks/1099619449096654889/FDR-YVEor0JNSCAwiT3M3RcTb_-mTjgqi4pxc2wp2PAIozzJPz0dZeq4qdfINzG8025a";
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  const Send = async (data) => {
    let formData = new FormData();
    formData.append("payload_json", `{"content": "New File Uploaded: ${new Date().toISOString()}"}`);
    formData.append("file1", data, data.name);

    try {
      const data = await axios.post(discordUrl, formData, config);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  return { Send };
}

export default DiscordService;
