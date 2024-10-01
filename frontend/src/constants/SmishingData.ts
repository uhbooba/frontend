// 메시지 리스트의 각 항목 타입
export type MessageType = {
  is_reply: boolean;
  img: string | null;
  text: string;
  day: number;
  time: string;
  tts_key: string | null;
};

// 선택지 목록의 타입
type ChoiceType = {
  [key: string]: string;
} | null;

// alert_message의 타입
type AlertMessageType = {
  title: string;
  detail: string;
} | null;

// ending의 타입
type EndingType = {
  img: string | null;
  title: string;
  detail: string;
  news: string;
  replayable: boolean;
} | null;

// 각 항목의 타입
type SmishingDataItemType = {
  sender: string;
  message_list: MessageType[];
  choice_list: ChoiceType;
  alert_message: AlertMessageType;
  ending: EndingType;
};

// 전체 데이터 타입
export type SmishingDataType = {
  [key: string]: SmishingDataItemType; //
};

export const smishingData: SmishingDataType = {
  A0000: {
    sender: '010-9801-2324',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '엄마, 휴대폰이 고장나서 수리 맡겨놓고 지금 컴터 인터넷 문자 사이트로 문자하고 있는 중이니까 답장줘ㅠㅠ',
        day: 20240924,
        time: '오후 8:22',
        tts_key: 'A1',
      },
    ],
    choice_list: {
      A0001: '얼른 답장한다',
      A0002: '전화를 걸어본다',
    },
    alert_message: null,
    ending: null,
  },
  A0001: {
    sender: '010-9801-2324',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '엄마, 휴대폰이 고장나서 수리 맡겨놓고 지금 컴터 인터넷 문자 사이트로 문자하고 있는 중이니까 답장줘ㅠㅠ',
        day: 20240924,
        time: '오후 8:22',
        tts_key: 'A1',
      },
      {
        is_reply: true,
        img: null,
        text: '아이고, 무슨 일이야?',
        day: 20240924,
        time: '오후 8:25',
        tts_key: null,
      },
      {
        is_reply: false,
        img: null,
        text: '수리비를 지금 내야하는데 돈이 없어서 30만 원만 아래 계좌로 바로 보내줄 수 있어?\n돈 내야지 폰 받을 수 있어서 빨리 부탁해 ㅠㅠ\n카뱅 111-222-3333',
        day: 20240924,
        time: '오후 8:28',
        tts_key: 'A2',
      },
    ],
    choice_list: {
      A0011: '돈을 보내준다',
      A0021_F: '무시하고 차단한다',
    },
    alert_message: null,
    ending: null,
  },
  A0002: {
    sender: '010-9801-2324',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '엄마, 휴대폰이 고장나서 수리 맡겨놓고 지금 컴터 인터넷 문자 사이트로 문자하고 있는 중이니까 답장줘ㅠㅠ',
        day: 20240924,
        time: '오후 8:22',
        tts_key: 'A1',
      },
    ],
    choice_list: {
      A0001: '얼른 답장한다',
      A0002: '전화를 걸어본다',
    },
    alert_message: {
      title: '처음 보는 전화번호에 전화를 걸지마세요!',
      detail:
        '돈을 보내줄 것을 요구하는 \n처음 보는 전화번호로 전화를 절대로 걸지 마시고 국번 없이 112번으로 신고하거나 보이스피싱지킴이에 신고하세요.',
    },
    ending: null,
  },
  A0011: {
    sender: '010-9801-2324',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '엄마, 휴대폰이 고장나서 수리 맡겨놓고 지금 컴터 인터넷 문자 사이트로 문자하고 있는 중이니까 답장줘ㅠㅠ',
        day: 20240924,
        time: '오후 8:22',
        tts_key: 'A1',
      },
      {
        is_reply: true,
        img: null,
        text: '아이고, 무슨 일이야?',
        day: 20240924,
        time: '오후 8:25',
        tts_key: null,
      },
      {
        is_reply: false,
        img: null,
        text: '수리비를 지금 내야하는데 돈이 없어서 30만 원만 아래 계좌로 바로 보내줄 수 있어?\n돈 내야지 폰 받을 수 있어서 빨리 부탁해 ㅠㅠ\n카뱅 111-222-3333',
        day: 20240924,
        time: '오후 8:28',
        tts_key: 'A2',
      },
    ],
    choice_list: {
      A0011: '돈을 보내준다',
      A0021_F: '무시하고 차단한다',
    },
    alert_message: {
      title: '절대로 모르는 계좌에 돈을 보내지 마세요',
      detail:
        '처음 보는 전화번호의 문자가 요구하는 돈을 절대로 보내주지 마시고 국번 없이 112번으로 신고하거나 보이스피싱지킴이에 신고하세요.',
    },
    ending: null,
  },
  A0021_F: {
    sender: '010-9801-2324',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '엄마, 휴대폰이 고장나서 수리 맡겨놓고 지금 컴터 인터넷 문자 사이트로 문자하고 있는 중이니까 답장줘ㅠㅠ',
        day: 20240924,
        time: '오후 8:22',
        tts_key: 'A1',
      },
      {
        is_reply: true,
        img: null,
        text: '아이고, 무슨 일이야?',
        day: 20240924,
        time: '오후 8:25',
        tts_key: null,
      },
      {
        is_reply: false,
        img: null,
        text: '수리비를 지금 내야하는데 돈이 없어서 30만 원만 아래 계좌로 바로 보내줄 수 있어?\n돈 내야지 폰 받을 수 있어서 빨리 부탁해 ㅠㅠ\n카뱅 111-222-3333',
        day: 20240924,
        time: '오후 8:28',
        tts_key: 'A2',
      },
    ],
    choice_list: null,
    alert_message: null,
    ending: {
      img: null,
      title: '"엄마 나 휴대폰 액정 깨졌어" 문자에 아직도 속으십니까',
      detail:
        '올해 2월 50대 여성 A씨는 낯선 문자메시지를 받았다. 누구냐는 물음에 "엄마 딸"이라며 보내 온 이모티콘이 평소 딸이 쓰던 것과 같아, A씨는 의심하지 못했다. 딸은 "출근 중 휴대폰 액정이 깨져 수리 중인데 급한 볼일을 봐야 한다"며 A씨에게 애플리케이션을 설치하고 신분증과 신용카드 사진을 찍어 보내도록 했다.',
      news: 'https://www.hankookilbo.com/News/Read/A2021090514180005660',
      replayable: true,
    },
  },
  B0000: {
    sender: '010-0208-9712',
    message_list: [
      {
        is_reply: false,
        img: 'https://s3.youm.me/uhbooba/smithing/invitation_letter.png',
        text: '[모바일청접장] \n김지윤♥차은우\n일시 : 10/5(토) 11:00\n많이많이 와주세요.\nhttps://shorturl.gouEX',
        day: 20240924,
        time: '오후 5:50',
        tts_key: 'B1',
      },
    ],
    choice_list: {
      B0001: '링크를 눌러 확인한다',
      B0002: '축하 인사를 보낸다',
    },
    alert_message: null,
    ending: null,
  },
  B0001: {
    sender: '010-0208-9712',
    message_list: [
      {
        is_reply: false,
        img: 'https://s3.youm.me/uhbooba/smithing/invitation_letter.png',
        text: '[모바일청접장] \n김지윤♥차은우\n일시 : 10/5(토) 11:00\n많이많이 와주세요.\nhttps://shorturl.gouEX',
        day: 20240924,
        time: '오후 5:50',
        tts_key: 'B1',
      },
    ],
    choice_list: {
      B0001: '링크를 눌러 확인한다',
      B0002: '축하 인사를 보낸다',
    },
    alert_message: {
      title: '출처를 알 수 없는 링크를 누르지 마세요',
      detail:
        '택배 배송 확인 등을 빙자해 출처를 알 수 없는 인터넷주소(URL)은 절대 클릭하지 말고 한국인터넷진흥원(118)에 즉시 신고하시기 바랍니다.',
    },
    ending: null,
  },
  B0002: {
    sender: '010-0208-9712',
    message_list: [
      {
        is_reply: false,
        img: 'https://s3.youm.me/uhbooba/smithing/invitation_letter.png',
        text: '[모바일청접장] \n김지윤♥차은우\n일시 : 10/5(토) 11:00\n많이많이 와주세요.\nhttps://shorturl.gouEX',
        day: 20240924,
        time: '오후 5:50',
        tts_key: 'B1',
      },
      {
        is_reply: true,
        img: null,
        text: '예, 축하드리고 연락 주셔서 감사합니다~^^',
        day: 20240924,
        time: '오후 5:51',
        tts_key: null,
      },
      {
        is_reply: false,
        img: 'https://s3.youm.me/uhbooba/smithing/invitation_letter.png',
        text: '나무은행 111-111-11111\n축의금은 이쪽으로 부탁드려요',
        day: 20240924,
        time: '오후 5:55',
        tts_key: 'B2',
      },
    ],
    choice_list: {
      B0012: '계좌 번호로 축의금을 보낸다',
      B0022_F: '이 번호를 차단한다',
    },
    alert_message: null,
    ending: null,
  },
  B0012: {
    sender: '010-0208-9712',
    message_list: [
      {
        is_reply: false,
        img: 'https://s3.youm.me/uhbooba/smithing/invitation_letter.png',
        text: '[모바일청접장] \n김지윤♥차은우\n일시 : 10/5(토) 11:00\n많이많이 와주세요.\nhttps://shorturl.gouEX',
        day: 20240924,
        time: '오후 5:50',
        tts_key: 'B1',
      },
      {
        is_reply: true,
        img: null,
        text: '예, 축하드리고 연락 주셔서 감사합니다~^^',
        day: 20240924,
        time: '오후 5:51',
        tts_key: null,
      },
      {
        is_reply: false,
        img: 'https://s3.youm.me/uhbooba/smithing/invitation_letter.png',
        text: '나무은행 111-111-11111\n축의금은 이쪽으로 부탁드려요',
        day: 20240924,
        time: '오후 5:55',
        tts_key: 'B2',
      },
    ],
    choice_list: {
      B0012: '계좌 번호로 축의금을 보낸다',
      B0022_F: '이 번호를 차단한다',
    },
    alert_message: {
      title: '모르는 계좌에 돈을 보내지 마세요',
      detail:
        '처음 보는 전화번호의 문자가\n요구하는 돈을 절대로 보내주지 마시고 국번 없이 112번으로 신고하거나 보이스피싱지킴이에 신고하세요.',
    },
    ending: null,
  },
  B0022_F: {
    sender: '010-0208-9712',
    message_list: [
      {
        is_reply: false,
        img: 'https://s3.youm.me/uhbooba/smithing/invitation_letter.png',
        text: '[모바일청접장] \n김지윤♥차은우\n일시 : 10/5(토) 11:00\n많이많이 와주세요.\nhttps://shorturl.gouEX',
        day: 20240924,
        time: '오후 5:50',
        tts_key: 'B1',
      },
      {
        is_reply: true,
        img: null,
        text: '예, 축하드리고 연락 주셔서 감사합니다~^^',
        day: 20240924,
        time: '오후 5:51',
        tts_key: null,
      },
      {
        is_reply: false,
        img: 'https://s3.youm.me/uhbooba/smithing/invitation_letter.png',
        text: '나무은행 111-111-11111\n축의금은 이쪽으로 부탁드려요',
        day: 20240924,
        time: '오후 5:55',
        tts_key: 'B2',
      },
    ],
    choice_list: null,
    alert_message: null,
    ending: {
      img: null,
      title: '모바일 청첩장 클릭했다가 1.4억 털렸다',
      detail:
        'A 씨는 예식장 정보 링크를 휴대전화 문자로 받았습니다.  클릭했지만 별다른 링크는 뜨지 않았고 A 씨는 별생각 없이 넘어갔습니다.  그리고 A 씨 명의의 보험사와 은행 등에서 1억 4천만 원 대출이 이뤄졌고 특정 계좌로 입금됐습니다.',
      news: 'https://news.sbs.co.kr/news/endPage.do?news_id=N1007264439',
      replayable: true,
    },
  },
  C0000: {
    sender: '010-5261-1881',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 출발\\n\\n고객님의 물건이 배송을 시작했습니다! 빠르고 안전하게 도착할 수 있도록 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 1:37',
        tts_key: 'C1',
      },
    ],
    choice_list: {
      C0001: '감사 인사를 보낸다',
      C0002: '링크를 눌러 확인한다',
      C0003: '무시한다',
    },
    alert_message: null,
    ending: null,
  },
  C0001: {
    sender: '010-5261-1881',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 출발\\n\\n고객님의 물건이 배송을 시작했습니다! 빠르고 안전하게 도착할 수 있도록 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 1:37',
        tts_key: 'C1',
      },
      {
        is_reply: true,
        img: null,
        text: '예, 연락 주셔서 감사합니다~^^',
        day: 20240923,
        time: '오후 2:00',
        tts_key: null,
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 지연\\n\\n예상치 못한 배송 중 문제로 오늘 도착 예정이었던 상품이 내일 배송될 예정입니다. 불편을 드려 죄송합니다. 빠른 배송을 위해 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 4:56',
        tts_key: 'C2',
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 주소 오류\\n\\n고객님의 상품이 배송 중이나, 주소 확인이 불가능하여 배송이 일시 중단되었습니다. 빠른 처리를 위해 세부 주소를 입력해 주시기 바랍니다.\\n\\n배송 주소 확인 : https://safedelivery.com/NjQ25IZ\\n\\n더 궁금한 사항이 있으면 고객센터(123-4567)로 문의해 주세요.',
        day: 20240924,
        time: '오전 9:00',
        tts_key: 'C3',
      },
    ],
    choice_list: {
      C0011: '배송 주소를 수정한다',
      C0021_F: '무시한다',
      C0031: '고객 센터에 문의한다',
    },
    alert_message: null,
    ending: null,
  },
  C0002: {
    sender: '010-5261-1881',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 출발\\n\\n고객님의 물건이 배송을 시작했습니다! 빠르고 안전하게 도착할 수 있도록 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 1:37',
        tts_key: 'C00000',
      },
    ],
    choice_list: {
      C0011: '배송 주소를 수정한다',
      C0021_F: '무시한다',
      C0031: '고객 센터에 문의한다',
    },
    alert_message: {
      title: '출처를 알 수 없는 링크를 누르지 마세요',
      detail:
        '택배 배송 확인 등을 빙자해 출처를 알 수 없는 인터넷주소(URL)은 절대 클릭하지 말고 한국인터넷진흥원(118)에 즉시 신고하시기 바랍니다.',
    },
    ending: null,
  },
  C0003: {
    sender: '010-5261-1881',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 출발\\n\\n고객님의 물건이 배송을 시작했습니다! 빠르고 안전하게 도착할 수 있도록 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 1:37',
        tts_key: 'C1',
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 지연\\n\\n예상치 못한 배송 중 문제로 오늘 도착 예정이었던 상품이 내일 배송될 예정입니다. 불편을 드려 죄송합니다. 빠른 배송을 위해 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 4:56',
        tts_key: 'C2',
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 주소 오류\\n\\n고객님의 상품이 배송 중이나, 주소 확인이 불가능하여 배송이 일시 중단되었습니다. 빠른 처리를 위해 세부 주소를 입력해 주시기 바랍니다.\\n\\n배송 주소 확인 : https://safedelivery.com/NjQ25IZ\\n\\n더 궁금한 사항이 있으면 고객센터(123-4567)로 문의해 주세요.',
        day: 20240924,
        time: '오전 9:00',
        tts_key: 'C3',
      },
    ],
    choice_list: {
      C0011: '배송 주소를 수정한다',
      C0021_F: '무시한다',
      C0031: '고객 센터에 문의한다',
    },
    alert_message: null,
    ending: null,
  },
  C0011: {
    sender: '010-5261-1881',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 출발\\n\\n고객님의 물건이 배송을 시작했습니다! 빠르고 안전하게 도착할 수 있도록 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 1:37',
        tts_key: 'C1',
      },
      {
        is_reply: true,
        img: null,
        text: '예, 연락 주셔서 감사합니다~^^',
        day: 20240923,
        time: '오후 2:00',
        tts_key: null,
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 지연\\n\\n예상치 못한 배송 중 문제로 오늘 도착 예정이었던 상품이 내일 배송될 예정입니다. 불편을 드려 죄송합니다. 빠른 배송을 위해 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 4:56',
        tts_key: 'C2',
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 주소 오류\\n\\n고객님의 상품이 배송 중이나, 주소 확인이 불가능하여 배송이 일시 중단되었습니다. 빠른 처리를 위해 세부 주소를 입력해 주시기 바랍니다.\\n\\n배송 주소 확인 : https://safedelivery.com/NjQ25IZ\\n\\n더 궁금한 사항이 있으면 고객센터(123-4567)로 문의해 주세요.',
        day: 20240924,
        time: '오전 9:00',
        tts_key: 'C3',
      },
    ],
    choice_list: {
      C0011: '배송 주소를 수정한다',
      C0021_F: '무시한다',
      C0031: '고객 센터에 문의한다',
    },
    alert_message: {
      title: '출처를 알 수 없는 링크를 누르지 마세요',
      detail:
        '택배 배송 확인 등을 빙자해 출처를 알 수 없는 인터넷주소(URL)은 절대 클릭하지 말고 한국인터넷진흥원(118)에 즉시 신고하시기 바랍니다.',
    },
    ending: null,
  },
  C0021_F: {
    sender: '010-5261-1881',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 출발\\n\\n고객님의 물건이 배송을 시작했습니다! 빠르고 안전하게 도착할 수 있도록 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 1:37',
        tts_key: 'C1',
      },
      {
        is_reply: true,
        img: null,
        text: '예, 연락 주셔서 감사합니다~^^',
        day: 20240923,
        time: '오후 2:00',
        tts_key: null,
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 지연\\n\\n예상치 못한 배송 중 문제로 오늘 도착 예정이었던 상품이 내일 배송될 예정입니다. 불편을 드려 죄송합니다. 빠른 배송을 위해 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 4:56',
        tts_key: 'C2',
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 주소 오류\\n\\n고객님의 상품이 배송 중이나, 주소 확인이 불가능하여 배송이 일시 중단되었습니다. 빠른 처리를 위해 세부 주소를 입력해 주시기 바랍니다.\\n\\n배송 주소 확인 : https://safedelivery.com/NjQ25IZ\\n\\n더 궁금한 사항이 있으면 고객센터(123-4567)로 문의해 주세요.',
        day: 20240924,
        time: '오전 9:00',
        tts_key: 'C3',
      },
    ],
    choice_list: null,
    alert_message: null,
    ending: {
      img: null,
      title: '"물품 배송됐습니다" URL 무심코 눌렀다가 2억 털렸다',
      detail:
        '50대 남성 C씨는 지난해 7월 알 수 없는 발신자에게서 ‘상점 물품 배송했습니다. 확인 부탁합니다’라는 문자메시지를 받았다. 이 문자엔 인터넷 주소(URL)가 포함돼 있었는데, C씨는 이를 물품 배송 현황을 확인할 수 있는 사이트 주소로 오해하고 눌렀다.',
      news: 'https://www.chosun.com/economy/2024/04/16/NSV2P3BZKFCK5GGH6BCIND5Q3I/',
      replayable: true,
    },
  },
  C0031: {
    sender: '010-5261-1881',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 출발\\n\\n고객님의 물건이 배송을 시작했습니다! 빠르고 안전하게 도착할 수 있도록 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 1:37',
        tts_key: 'C1',
      },
      {
        is_reply: true,
        img: null,
        text: '예, 연락 주셔서 감사합니다~^^',
        day: 20240923,
        time: '오후 2:00',
        tts_key: null,
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 지연\\n\\n예상치 못한 배송 중 문제로 오늘 도착 예정이었던 상품이 내일 배송될 예정입니다. 불편을 드려 죄송합니다. 빠른 배송을 위해 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 4:56',
        tts_key: 'C2',
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 주소 오류\\n\\n고객님의 상품이 배송 중이나, 주소 확인이 불가능하여 배송이 일시 중단되었습니다. 빠른 처리를 위해 세부 주소를 입력해 주시기 바랍니다.\\n\\n배송 주소 확인 : https://safedelivery.com/NjQ25IZ\\n\\n더 궁금한 사항이 있으면 고객센터(123-4567)로 문의해 주세요.',
        day: 20240924,
        time: '오전 9:00',
        tts_key: 'C3',
      },
    ],
    choice_list: {
      C0011: '배송 주소를 수정한다',
      C0021_F: '무시한다',
      C0031: '고객 센터에 문의한다',
    },
    alert_message: {
      title: '모르는 번호로 전화걸지 마세요',
      detail: '걸지마!',
    },
    ending: null,
  },
  C0013: {
    sender: '010-5261-1881',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 출발\\n\\n고객님의 물건이 배송을 시작했습니다! 빠르고 안전하게 도착할 수 있도록 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 1:37',
        tts_key: 'C1',
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 지연\\n\\n예상치 못한 배송 중 문제로 오늘 도착 예정이었던 상품이 내일 배송될 예정입니다. 불편을 드려 죄송합니다. 빠른 배송을 위해 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 4:56',
        tts_key: 'C2',
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 주소 오류\\n\\n고객님의 상품이 배송 중이나, 주소 확인이 불가능하여 배송이 일시 중단되었습니다. 빠른 처리를 위해 세부 주소를 입력해 주시기 바랍니다.\\n\\n배송 주소 확인 : https://safedelivery.com/NjQ25IZ\\n\\n더 궁금한 사항이 있으면 고객센터(123-4567)로 문의해 주세요.',
        day: 20240924,
        time: '오전 9:00',
        tts_key: 'C3',
      },
    ],
    choice_list: {
      C0011: '배송 주소를 수정한다',
      C0021_F: '무시한다',
      C0031: '고객 센터에 문의한다',
    },
    alert_message: {
      title: '출처를 알 수 없는 링크를 누르지 마세요',
      detail:
        '택배 배송 확인 등을 빙자해 출처를 알 수 없는 인터넷주소(URL)은 절대 클릭하지 말고 한국인터넷진흥원(118)에 즉시 신고하시기 바랍니다.',
    },
    ending: null,
  },
  C0023_F: {
    sender: '010-5261-1881',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 출발\\n\\n고객님의 물건이 배송을 시작했습니다! 빠르고 안전하게 도착할 수 있도록 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 1:37',
        tts_key: 'C1',
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 지연\\n\\n예상치 못한 배송 중 문제로 오늘 도착 예정이었던 상품이 내일 배송될 예정입니다. 불편을 드려 죄송합니다. 빠른 배송을 위해 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 4:56',
        tts_key: 'C2',
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 주소 오류\\n\\n고객님의 상품이 배송 중이나, 주소 확인이 불가능하여 배송이 일시 중단되었습니다. 빠른 처리를 위해 세부 주소를 입력해 주시기 바랍니다.\\n\\n배송 주소 확인 : https://safedelivery.com/NjQ25IZ\\n\\n더 궁금한 사항이 있으면 고객센터(123-4567)로 문의해 주세요.',
        day: 20240924,
        time: '오전 9:00',
        tts_key: 'C3',
      },
    ],
    choice_list: null,
    alert_message: null,
    ending: {
      img: null,
      title: '"물품 배송됐습니다" URL 무심코 눌렀다가 2억 털렸다',
      detail:
        '50대 남성 C씨는 지난해 7월 알 수 없는 발신자에게서 ‘상점 물품 배송했습니다. 확인 부탁합니다’라는 문자메시지를 받았다. 이 문자엔 인터넷 주소(URL)가 포함돼 있었는데, C씨는 이를 물품 배송 현황을 확인할 수 있는 사이트 주소로 오해하고 눌렀다.',
      news: 'https://www.chosun.com/economy/2024/04/16/NSV2P3BZKFCK5GGH6BCIND5Q3I/',
      replayable: true,
    },
  },
  C0033: {
    sender: '010-5261-1881',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 출발\\n\\n고객님의 물건이 배송을 시작했습니다! 빠르고 안전하게 도착할 수 있도록 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 1:37',
        tts_key: 'C1',
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 지연\\n\\n예상치 못한 배송 중 문제로 오늘 도착 예정이었던 상품이 내일 배송될 예정입니다. 불편을 드려 죄송합니다. 빠른 배송을 위해 최선을 다하겠습니다.\\n\\n실시간 배송정보 : https://safedelivery.com/NjQ2ODU',
        day: 20240923,
        time: '오후 4:56',
        tts_key: 'C2',
      },
      {
        is_reply: false,
        img: null,
        text: '[안심택배] 배송 주소 오류\\n\\n고객님의 상품이 배송 중이나, 주소 확인이 불가능하여 배송이 일시 중단되었습니다. 빠른 처리를 위해 세부 주소를 입력해 주시기 바랍니다.\\n\\n배송 주소 확인 : https://safedelivery.com/NjQ25IZ\\n\\n더 궁금한 사항이 있으면 고객센터(123-4567)로 문의해 주세요.',
        day: 20240924,
        time: '오전 9:00',
        tts_key: 'C3',
      },
    ],
    choice_list: {
      C0011: '배송 주소를 수정한다',
      C0021_F: '무시한다',
      C0031: '고객 센터에 문의한다',
    },
    alert_message: {
      title: '모르는 번호로 전화걸지 마세요',
      detail: '걸지마!',
    },
    ending: null,
  },
  D0000_F: {
    sender: '1588-2187',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '축하합니다! 응모하신 임영웅 콘서트 티켓에 당첨되었습니다 \n티켓 수령을 위해 아래 링크에서 추가 정보를 입력해 주세요.\n▶ 티켓 수령: http://bit.ly/Concert123\n기한 내 입력하지 않으면 당첨이 취소될 수 있습니다.',
        day: 20240923,
        time: '오후 7:07',
        tts_key: 'D1',
      },
    ],
    choice_list: null,
    alert_message: null,
    ending: {
      img: null,
      title: '"당첨 축하드립니다!" 이벤트 사칭 스미싱 문자 사기 주의보',
      detail:
        "인터넷전문은행 케이뱅크와 편의점 CU 등에서 '세뱃돈 지급 이벤트'를 사칭한 스미싱 문자가 유포되자 금융당국이 대응에 나섰다.",
      news: 'https://news.kbs.co.kr/news/pc/view/view.do?ncd=7887747',
      replayable: false,
    },
  },
  E0000: {
    sender: '010-2363-4768',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: 'S사 상한가 포착!\n수익률 보장, 투자 황금 기회!\n\n오늘 정보방 이용해 주신 분들에 한하여 다음주 급등 종목 전달 드립니다.\n\n무료방 입장\nhttps://band.us/n/af3gouEX',
        day: 20240923,
        time: '오후 1:24',
        tts_key: 'E1',
      },
    ],
    choice_list: {
      E0001: '바쁘니 다음에 확인한다',
      E0002: '밴드방에 입장한다',
    },
    alert_message: null,
    ending: null,
  },
  E0001: {
    sender: '010-2363-4768',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: 'S사 상한가 포착!\n수익률 보장, 투자 황금 기회!\n\n오늘 정보방 이용해 주신 분들에 한하여 다음주 급등 종목 전달 드립니다.\n\n무료방 입장\nhttps://band.us/n/af3gouEX',
        day: 20240923,
        time: '오후 1:24',
        tts_key: 'E1',
      },
      {
        is_reply: false,
        img: null,
        text: 'N사는 이차전지 확장팩을 출시하고 북미와 유럽에 진출했습니다. 관련 선택 종목도 저희는 보유중입니다.\n\n무료방 입장\nhttps://band.us/n/af3gouEX',
        day: 20240923,
        time: '오후 3:17',
        tts_key: 'E2',
      },
    ],
    choice_list: {
      E0011: '지인에게 이 사실을 공유한다',
      E0021_F: '욕을 보낸다',
    },
    alert_message: null,
    ending: null,
  },
  E0002: {
    sender: '010-2363-4768',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: 'S사 상한가 포착!\n수익률 보장, 투자 황금 기회!\n\n오늘 정보방 이용해 주신 분들에 한하여 다음주 급등 종목 전달 드립니다.\n\n무료방 입장\nhttps://band.us/n/af3gouEX',
        day: 20240923,
        time: '오후 1:24',
        tts_key: 'E1',
      },
    ],
    choice_list: {
      E0001: '바쁘니 다음에 확인한다',
      E0002: '밴드방에 입장한다',
    },
    alert_message: {
      title: '출처를 알 수 없는 링크를 누르지 마세요',
      detail:
        '주식 종목 추천 등 출처를 알 수 없는 인터넷주소(URL)은 절대 클릭하지 말고 한국인터넷진흥원(118)에 즉시 신고하시기 바랍니다.',
    },
    ending: null,
  },
  E0011: {
    sender: '010-2363-4768',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: 'S사 상한가 포착!\n수익률 보장, 투자 황금 기회!\n\n오늘 정보방 이용해 주신 분들에 한하여 다음주 급등 종목 전달 드립니다.\n\n무료방 입장\nhttps://band.us/n/af3gouEX',
        day: 20240923,
        time: '오후 1:24',
        tts_key: 'E1',
      },
      {
        is_reply: false,
        img: null,
        text: 'N사는 이차전지 확장팩을 출시하고 북미와 유럽에 진출했습니다. 관련 선택 종목도 저희는 보유중입니다.\n\n무료방 입장\nhttps://band.us/n/af3gouEX',
        day: 20240923,
        time: '오후 3:17',
        tts_key: 'E2',
      },
    ],
    choice_list: {
      E0011: '지인에게 이 사실을 공유한다',
      E0021_F: '욕을 보낸다',
    },
    alert_message: {
      title: '의심스러운 정보는 먼저 확인gktpdy',
      detail:
        '지인에게 신뢰할 수 없는 내용을 공유하지 마세요. 이 문자는 주식 사기나 스미싱일 수 있습니다.',
    },
    ending: null,
  },
  E0021_F: {
    sender: '010-2363-4768',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: 'S사 상한가 포착!\n수익률 보장, 투자 황금 기회!\n\n오늘 정보방 이용해 주신 분들에 한하여 다음주 급등 종목 전달 드립니다.\n\n무료방 입장\nhttps://band.us/n/af3gouEX',
        day: 20240923,
        time: '오후 1:24',
        tts_key: 'E1',
      },
      {
        is_reply: false,
        img: null,
        text: 'N사는 이차전지 확장팩을 출시하고 북미와 유럽에 진출했습니다. 관련 선택 종목도 저희는 보유중입니다.\n\n무료방 입장\nhttps://band.us/n/af3gouEX',
        day: 20240923,
        time: '오후 3:17',
        tts_key: 'E2',
      },
    ],
    choice_list: null,
    alert_message: null,
    ending: {
      img: null,
      title: '쏟아지는 도박·주식투자 문자',
      detail:
        '허위 사실이 담긴 호재성 문자 메시지를 대량 살포해 주가 부양을 도모한 일당이 재판에 넘겨졌다.',
      news: 'https://www.chosun.com/national/national_general/2024/08/23/WDRO6W7MFRCKLLGR2NTNMXGM3Y/',
      replayable: true,
    },
  },
  F0000_F: {
    sender: '031-2246-2924',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '귀하에게 민원이 접수되어 통보드립니다. - 수원지방법원 -\n내용확인 https://bit.ly/2Hh9vp9',
        day: 20240920,
        time: '오후 5:49',
        tts_key: 'F1',
      },
    ],
    choice_list: null,
    alert_message: null,
    ending: {
      img: null,
      title: '공공기관 사칭 스미싱 20배 폭증',
      detail:
        '지난해 공공기관을 사칭한 스미싱 문자메시지가 2022년보다 20배 가까이 폭증한 것으로 나타났다. 금융당국은 설 연휴를 전후해 유사 범죄가 기승을 부릴 것으로 보고 주의를 당부했다.',
      news: 'https://www.donga.com/news/Society/article/all/20240207/123437651/1',
      replayable: false,
    },
  },
  G0000_F: {
    sender: '나무은행',
    message_list: [
      {
        is_reply: false,
        img: null,
        text: '은행 방문없이 전화 상담만으로 빠르고 간편하게 대출이 가능합니다.\n\n나무은행 특별 신규우대금리\n신용 등급 무관, 최대 1억 원\n\n진행을 원하시면 신분증(주민등록증, 운전면허, 여권가능)사진과 계좌번호를 보내 주세요.\n상담원 연결 : 010-9876-5432',
        day: 20240920,
        time: '오후 2:34',
        tts_key: 'G1',
      },
    ],
    choice_list: null,
    alert_message: null,
    ending: {
      img: null,
      title: '‘신용등급 무관’·‘한시적 정책 상품’… 불법대출 문자 조심하세요',
      detail:
        '3일 금융감독원은 최근 공공기관이나 은행을 사칭한 불법대출 문자메시지가 급증했다며 소비자피해 주의 경보를 내렸다.',
      news: 'https://www.segye.com/newsView/20191203506620',
      replayable: false,
    },
  },
};
