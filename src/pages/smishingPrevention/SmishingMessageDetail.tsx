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
  const [showEndingOnClick, setShowEndingOnClick] = useState(false); // 엔딩 클릭 여부
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isTTSPlaying, setIsTTSPlaying] = useState(false); // TTS 재생 여부

  // 모달 데이터
  const [modalData, setModalData] = useState({
    title: '',
    detail: '',
    retryText: '다시 선택',
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

  const isEndingCase = messageType?.includes('F');

  useEffect(() => {
    if (isEndingCase) {
      setCurrentMessageList(smishing?.message_list || []);
      setShowEndingOnClick(true);
    } else {
      setCurrentMessageList([smishing?.message_list[0]]);
    }
  }, [messageType, smishing, isEndingCase]);

  // 문자 메세지 추가 딜레이 -> 3초 뒤에 보내도록
  const addMessagesWithDelay = useCallback(
    async (newMessages: MessageType[], selectedData: SmishingDataItemType) => {
      if (newMessages.length > 0 && !isEndingCase) {
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

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 상태 초기화
  const resetState = () => {
    const initialSmishing = data[messageType as keyof typeof data] ?? {};
    setSmishing(initialSmishing);
    setCurrentMessageList(
      isEndingCase
        ? initialSmishing?.message_list
        : [initialSmishing?.message_list[0]],
    );
    setIsModalOpen(false);
    setModalData({
      title: '',
      detail: '',
      retryText: '다시 선택',
    });
  };

  const handleScreenClick = () => {
    if (showEndingOnClick) {
      navigate('ending', { state: { endingId: messageType } });
    }
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
        retryText: '다시 선택',
      });
      setIsModalOpen(true);
    } else {
      if (selectedData) {
        const newMessages = selectedData.message_list.slice(1);
        addMessagesWithDelay(newMessages, selectedData);
      }
    }
  };

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

  const handleLinkClick = () => {
    setModalData({
      title: '출처를 알 수 없는 링크를 누르지 마세요',
      detail:
        '출처를 알 수 없는 인터넷주소(URL)은 절대 클릭하지 말고 한국인터넷진흥원(118)에 즉시 신고하시기 바랍니다.',
      retryText: '확인',
    });
    setIsModalOpen(true);
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
    if (!ttsKey || isTTSPlaying) return;

    try {
      setIsTTSPlaying(true);

      const response = await getSmishingTTS(ttsKey);
      const blob = new Blob([response.data], { type: 'audio/wav' });
      const blobUrl = URL.createObjectURL(blob); // Blob URL 생성

      if (audioRef.current) {
        audioRef.current.pause();
      }

      audioRef.current = new Audio(blobUrl);
      audioRef.current.play();

      audioRef.current.onended = () => {
        setIsTTSPlaying(false);
        URL.revokeObjectURL(blobUrl);
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex max-h-screen flex-col'>
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
      <div
        className='mt-6 flex flex-grow flex-col overflow-hidden px-5 pt-16'
        onClick={handleScreenClick}
      >
        <div
          className={`scrollbar-none h-full overflow-y-auto p-4 ${buttons?.length > 0 ? 'mb-64' : 'mb-0'}`}
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
              onLinkClick={handleLinkClick}
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
          retryText={modalData.retryText}
        />
      )}
    </div>
  );
};

export default SmishingMessageDetail;