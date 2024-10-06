import { useState, useCallback, useRef, useEffect } from 'react';
import TopBar from '@/components/layouts/TopBar';
import MessageBottom from '@/components/smishingPrevention/MessageBottom';
import MessageBubble from '@/components/smishingPrevention/MessageBubble';
import { SmishingButtonConfigType } from '@/components/smishingPrevention/SmishingButton';
import QuizModal from '@/components/quiz/QuizModal';
import {
  MessageType,
  smishingData,
  SmishingDataItemType,
} from '@/constants/SmishingData';
import { useFormattedContent } from '@/hooks/useFormattedContent';
import { useNavigate, useParams } from 'react-router';
import { getSmishingTTS } from '@/services/education';

const SmishingMessageDetail = () => {
  const navigate = useNavigate();
  const { messageType } = useParams(); // 시작 타입
  const [data] = useState(smishingData); // 피싱 데이터
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 show
  const [isSendingMessages, setIsSendingMessages] = useState(false); // 메세지 전송 중인지
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // 모달 데이터
  const [modalData, setModalData] = useState({
    title: '',
    detail: '',
  });

  // 스미싱 데이터
  const [smishing, setSmishing] = useState(
    data[messageType as keyof typeof data] ?? {},
  );
  const [currentMessageList, setCurrentMessageList] = useState<MessageType[]>([
    smishing?.message_list[0],
  ]);

  // 모달 데이터 format
  const formattedModalTitle = useFormattedContent(modalData.title, 'text-2xl');
  const formattedModalDetail = useFormattedContent(modalData.detail, 'text-xl');

  // 문자 메세지 추가 딜레이 -> 3초 뒤에 보내도록
  const addMessagesWithDelay = useCallback(
    async (newMessages: MessageType[], selectedData: SmishingDataItemType) => {
      if (newMessages.length > 0) {
        setIsSendingMessages(true); // 메세지 전송 시작
        setCurrentMessageList((prevMessages) => [
          ...prevMessages,
          newMessages[0],
        ]);

        for (let i = 1; i < newMessages.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          setCurrentMessageList((prevMessages) => [
            ...prevMessages,
            newMessages[i],
          ]);
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
      setSmishing(selectedData);
      setIsSendingMessages(false); // 메시지 전송 완료
    },
    [],
  );

  useEffect(() => {
    return () => {
      resetState();
    };
  }, []);

  // 상태 초기화
  const resetState = () => {
    const initialSmishing = data[messageType as keyof typeof data] ?? {};
    setSmishing(initialSmishing);
    setCurrentMessageList([initialSmishing?.message_list[0]]);
    setIsModalOpen(false);
    setModalData({
      title: '',
      detail: '',
    });
  };

  const handleButtonClick = (choice: string) => {
    const selectedData = data[choice];

    // 엔딩 데이터가 존재하는 경우 엔딩 페이지로 전환
    if (selectedData?.ending) {
      navigate('ending', { state: { endingId: choice } });
      return;
    }

    if (selectedData?.alert_message !== null) {
      setModalData({
        title: selectedData.alert_message.title,
        detail: selectedData.alert_message.detail,
      });
      setIsModalOpen(true);
    } else {
      if (selectedData) {
        const newMessages = selectedData.message_list.slice(1);
        addMessagesWithDelay(newMessages, selectedData);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (smishing?.ending) {
        navigate('ending', { state: { endingId: messageType } });
      }
    }, 10000); // 10초  후에 실행

    return () => clearTimeout(timer); //  타이머 정리
  }, []);

  // 스미싱 버튼
  const buttons: SmishingButtonConfigType[] = Object.entries(
    smishing?.choice_list || {},
  ).map(([key, label]) => ({
    label: label,
    onClick: () => handleButtonClick(key),
    className:
      'bg-primary text-black rounded-lg py-6 mb-3 text-2xl px-4 w-full',
  }));

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      const scrollHeight = messagesContainerRef.current.scrollHeight;
      const height = messagesContainerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messagesContainerRef.current.scrollTop =
        maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentMessageList, scrollToBottom]);

  // TTS 클릭
  const handleTTS = async (ttsKey: string | null) => {
    if (!ttsKey) return;
    try {
      const response = await getSmishingTTS(ttsKey);
      console.log(response);

      const blob = new Blob([response.data], { type: 'audio/wav' });

      const blobUrl = URL.createObjectURL(blob); // Blob URL 생성
      new Audio(blobUrl).play(); // Audio 객체 생성 및 재생
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex max-h-screen flex-col'>
      <div className='scrollbar-none fixed left-0 top-0 z-10 w-full'>
        <TopBar
          title={
            <div className='flex flex-row items-center justify-center'>
              <div className='mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300'>
                <span className='text-gray-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-6'
                  >
                    <path
                      fillRule='evenodd'
                      d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              </div>
              <p>{smishing?.sender}</p>
            </div>
          }
          showXButton={false}
        />
      </div>
      <div className='mt-6 flex flex-grow flex-col overflow-hidden px-5 pt-16'>
        <div
          className='scrollbar-none mb-64 h-full overflow-y-auto p-4'
          ref={messagesContainerRef}
        >
          {currentMessageList.map((message, index) => (
            <MessageBubble
              key={index}
              imgUrl={message.img}
              content={message.text}
              time={message.time}
              isUser={message.is_reply}
              onTTSClick={() => handleTTS(message.tts_key)}
            />
          ))}
        </div>
      </div>
      {!isSendingMessages && (
        <div className='fixed bottom-0 w-full flex-shrink-0 bg-white p-4'>
          <div className='mx-auto flex w-full max-w-md flex-row items-center justify-center'>
            <MessageBottom isButton={true} buttons={buttons} />
          </div>
        </div>
      )}
      {isModalOpen && (
        <QuizModal
          content={
            <div className='break-words'>
              <div className='mb-2'>{formattedModalTitle}</div>
              {formattedModalDetail}
            </div>
          }
          isCorrect={false}
          onRetry={closeModal}
          retryText='다시 선택'
        />
      )}
    </div>
  );
};

export default SmishingMessageDetail;
