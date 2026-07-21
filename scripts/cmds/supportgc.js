module.exports = {
  config: {
    name: "supportgc",
    version: "1.1",
    author: "badhon",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "সাপোর্ট গ্রুপে যোগ দিন"
    },
    longDescription: {
      en: "অফিসিয়াল সাপোর্ট গ্রুপে যোগ দেওয়ার কমান্ড"
    },
    category: "General",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event, threadsData, message }) {
    const supportGroupThreadID = "10001564263269473";

    try {
      const { members } = await threadsData.get(supportGroupThreadID);

      const ইতিমধ্যে_আছে = members.some(
        m => m.userID === event.senderID && m.inGroup
      );

      if (ইতিমধ্যে_আছে) {
        return message.reply(
`বিসমিল্লাহির রাহমানির রাহিম  
আসসালামু আলাইকুম ওয়া রহমাতুল্লাহ 🤍

🚫 আপনি ইতিমধ্যেই SupportGc গ্রুপের সদস্য  
━━━━━━━━━━━━━━━━━━`
        );
      }

      await api.addUserToGroup(event.senderID, supportGroupThreadID);

      return message.reply(
`বিসমিল্লাহির রাহমানির রাহিম  
আসসালামু আলাইকুম ওয়া রহমাতুল্লাহ 🤍

🎉 আপনাকে সফলভাবে SupportGc গ্রুপে যুক্ত করা হয়েছে  
✨ আমাদের সাথে থাকার জন্য ধন্যবাদ  
━━━━━━━━━━━━━━━━━━`
      );
    } catch (e) {
      console.error(e);
      return message.reply(
`বিসমিল্লাহির রাহমানির রাহিম  
আসসালামু আলাইকুম ওয়া রহমাতুল্লাহ 🤍

❌ দুঃখিত, আপনাকে SupportGc গ্রুপে যুক্ত করা সম্ভব হয়নি  
👉 অনুগ্রহ করে আমাকে Friend Request দিন  
👉 অথবা আপনার প্রোফাইল Unlock করে আবার চেষ্টা করুন  
━━━━━━━━━━━━━━━━━━`
      );
    }
  }
};