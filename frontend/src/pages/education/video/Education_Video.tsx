import KeywordButtons from '@/components/common/KeywordButtons';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';
import { useState } from 'react';

const EducationVideo = () => {
  const [selectKeyword, setSelectKeyword] = useState('모두 보기');

  const keywordClick = (keyword: string) => {
    setSelectKeyword(keyword);
  };

  const keywords = [
    '모두 보기',
    '금융위원회',
    '시.금.치',
  ];

  const videoData = [
    {
      "id": 9,
      "keyword": "시.금.치",
      "title": "시니어들의 모바일 금융을 코치해드립니다 - ep.3 계좌정보통합관리 활용법",
      "url": "https://www.youtube.com/embed/k8tPGl0b8Mw?si=iIki0SdHnoEz-da9?nocache=1&rel=0",
      "description": "나도 모르고 있던 계좌를 찾아드립니다\r구석구석 숨겨져 있던 은행계좌,증권 등\r조회 한번으로 모두 볼 수 있다",
      "upload_at": "2023-06-28"
    },
    {
      "id": 8,
      "keyword": "시.금.치",
      "title": "시니어들의 모바일 금융을 코치해드립니다 - ep.2 오픈뱅킹 활용법",
      "url": "https://www.youtube.com/embed/pGz5vv-wluY?si=1YGa5zJv0GZc-T3L?nocache=1&rel=0",
      "description": "이제는 어플 하나로 \r은행업무를 모두 해결 할 수 있다?!\r시간절약! 체력절약!\r한 곳에서 모두 처리 할 수 있는 오픈뱅킹",
      "upload_at": "2023-06-27"
    },
    {
      "id": 7,
      "keyword": "시.금.치",
      "title": "시니어들의 모바일 금융을 코치해드립니다 - ep.1 모바일뱅킹 활용법",
      "url": "https://www.youtube.com/embed/1DkgltNXDXs?si=Wzm1WnJrQX6Kgw2f?nocache=1&rel=0",
      "description": "어플 설치부터 은행업무까지\r \r모바일 뱅킹에 익숙하지 않은\r시니어들을 위한 모바일뱅킹 활용법",
      "upload_at": "2023-06-26"
    },
    {
      "id": 6,
      "keyword": "금융위원회",
      "title": "할머니들은 금융교육을 어디서 받죠?",
      "url": "https://www.youtube.com/embed/wXHHL0DXTug?si=6h9rymZASlOuYznu?nocache=1&rel=0",
      "description": "할머니들은 금융교육을 어디서 받죠? [할머니께 스마트금융을 알려드렸다] - EP.6\n\n할머니들에게 스마트금융을 알기 쉽게 알려드리고자 \n일상에 필요한 주제로 진행해온 스금알이 \n이번 6화를 마지막으로 인사를 드리게 되었습니다 ?\n\n마지막 6화에서는 앞으로 할머니들이 저희 스금알 없이도\n일상에서 가족들과 함께 다양한 금융교육을 받아볼 수 있는 \n유용한 사이트를 알려드렸는데요!\n",
      "upload_at": "2021-10-20"
    },
    {
      "id": 5,
      "keyword": "금융위원회",
      "title": "우리 할머니들과 보이스피싱 예방부터 대응까지 싹 파헤쳐보겠습니다",
      "url": "https://www.youtube.com/embed/iaBtn6ew_pY?si=LSsmRCFQglqpGCXi?nocache=1&rel=0",
      "description": "이번 5화에서는 스마트폰을 이용한 금융범죄 2탄 '보이스피싱'에 대해서 \n할머니들과 파헤쳐 보았어요!\n\n지난 4화에서 알아본 '스미싱 범죄'(*하단 링크)와 함께 \n여전히 기승을 부리고 있는 '보이스피싱'을 사례별로 알아보고\n미리 예방하는 방법부터 피해 발생 시 대응하는 방법까지 \nA부터 Z까지 알려드렸습니다!\n\n70세 어르신들의 스마트금융 도전기!\n[할머니께 스마트금융을 알려드렸다]\n\n그 다섯 번째 에피소드\n'할머니와 함께 보이스피싱 파헤치기', 지금 시작합니다.\n\n✔스미싱으로부터 나를 지키자 [할머니께 스마트금융을 알려드렸다] \n\n",
      "upload_at": "2021-10-08"
    },
    {
      "id": 4,
      "keyword": "금융위원회",
      "title": "스미싱으로부터 나를 지키자 #메신저피싱",
      "url": "https://www.youtube.com/embed/Fn84Xpw5IZg?si=h-MPck4SPWzzRpwB?nocache=1&rel=0",
      "description": "오래간만에 '스금알'로 다시 모인 할머님들!\n\n유독 명절 기간에 기승을 부리는 '스미싱 범죄'에 대해서 \n파헤쳐 보았어요! \n\n스마트폰을 통해 피해가 자주 발생하는 스미싱을 사례별로 알아보고 \n미리 예방하는 방법부터 피해 발생시 대응하는 방법까지 \n쭈욱 알려드렸습니다!  \n\n70세 어르신들의 스마트금융 도전기!\n[할머니께 스마트금융을 알려드렸다]\n\n그 네 번째 에피소드\n'스미싱으로부터 나를 지키자', 지금 시작합니다.\n",
      "upload_at": "2021-09-17"
    },
    {
      "id": 3,
      "keyword": "금융위원회",
      "title": "할머니들의 쌓인 카드포인트 현금화하기 (feat. 어카운트인포)",
      "url": "https://www.youtube.com/embed/3L7AaWStQq8?si=_pilP4oiGwt8gr7X?nocache=1&rel=0",
      "description": "'스금알'과 함께 점점 업그레이드되고 있는 어르신들의 스마트 금융생활! \n\n우리 할머님들이 언제 만들었는지 기억도 안 나는\n은행 계좌와 신용카드 내역을 계좌정보통합관리서비스(어카운트인포)에서 \n한눈에 촤라락 보여드렸어요! \n\n특히 그동안 쌓여왔던 신용카드 포인트를 '계좌정보통합관리서비스'를 통해 \n한 번에 현금화하는 방법도 알려드렸더니 유독 즐거워하셨답니다!\n\n70세 어르신들의 스마트금융 도전기!\n[할머니께 스마트금융을 알려드렸다]\n\n그 세 번째 에피소드\n'할머니들의 쌓인 카드포인트 현금화하기'를 지금 시작합니다.\n",
      "upload_at": "2021-08-18"
    },
    {
      "id": 2,
      "keyword": "금융위원회",
      "title": "할머니들의 첫 메신저 송금 (feat. 손자·손녀)",
      "url": "https://www.youtube.com/embed/3B5j9q3MGag?si=6HpTkF2m2-FkfbOT?nocache=1&rel=0",
      "description": "지난 시간에 배운 '스마트뱅킹'으로 \n한결 업그레이드된 어르신들의 스마트 금융생활!\n\n이번 시간엔 손자·손녀에게 모바일 메신저로\n용돈을 보내는 법을 배워보셨어요!\n\n\"계좌번호를 몰라도 돈을 보낼 수 있다구?\"\n생각보다 더 스마트해진 금융에 깜짝 놀라신 우리 할머님들?\n깨톡 보내듯이 간편하게 송금에 성공하셨답니다!\n\n70세 어르신들의 스마트금융 도전기!\n[할머니께 스마트금융을 알려드렸다]\n\n그 두번째 에피소드\n'할머니들의 첫 메신저 송금 (feat. 손자·손녀)'를 지금 시작합니다.\n\n",
      "upload_at": "2021-07-27"
    },
    {
      "id": 1,
      "keyword": "금융위원회",
      "title": "할머니들의 첫 스마트뱅킹",
      "url": "https://www.youtube.com/embed/CJ3F28iEfZs?si=UFUb_tkCE2aPGfKE&nocache=1&rel=0",
      "description": "은행 업무를 더욱 편리하게 만든\n스마트뱅킹!\n하지만 이런 새로운 변화가\n일상 속 어려움으로 다가오는 분들이 있답니다.\n바로 우리 할머니! 할아버지!!\n우리 어르신들의 불편함을\n조금이나마 해소해드리고 싶어 만든 영상,\n70세 어르신들의 스마트금융 도전기!\n[할머니께 스마트금융을 알려드렸다]\n그 첫번째 에피소드\n'할머니들의 첫 스마트뱅킹'을 지금 시작합니다.",
      "upload_at": "2021-07-17"
    },
  ];

  const filteredVideos = videoData.filter(video =>
    selectKeyword === '모두 보기' || video.keyword === selectKeyword
  );

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='교육영상' />
      </div>

      <div className='mt-20 border-b-2'>
        <KeywordButtons
          keywords={keywords}
          onKeywordClick={keywordClick}
          keywordBtnColor={selectKeyword}
        />
      </div>

      <div className='mt-4 px-4'>
        {filteredVideos.map(video => (
          <div key={video.id} className='mb-8 p-4 border rounded-lg shadow-md bg-white'>
            <h3 className='text-xl font-bold mb-2 text-gray-800'>{video.title}</h3>
            <iframe
              width="100%"
              height="315"
              src={video.url}
              title={video.title}
              className='mb-4 rounded-lg border-2 border-gray-300'
              allow="accelerometer; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </div>

      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default EducationVideo;
