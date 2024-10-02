import React, { useState, useCallback, useRef, useEffect } from 'react';
import TopBar from '@/components/layouts/TopBar';
import MessageBottom from '@/components/smishingPrevention/MessageBottom';
import MessageBubble from '@/components/smishingPrevention/MessageBubble';
import { SmishingButtonConfigType } from '@/components/smishingPrevention/SmishingButton';
import QuizModal from '@/components/quiz/QuizModal';
import { MessageType, smishingData } from '@/constants/SmishingData';
import { useFormattedContent } from '@/hooks/useFormattedContent';
import { useParams } from 'react-router';
import SmishingEnding from '@/components/smishingPrevention/SmishingEnding'; // EndingScreen 컴포넌트 임포트

const SmishingMessageDetail = () => {
  const { messageType } = useParams(); // 시작 타입
  const [data] = useState(smishingData); // 피싱 데이터
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 show
  const [isEnding, setIsEnding] = useState(false); // 엔딩 페이지 여부
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [modalData, setModalData] = useState({
    title: '',
    detail: '',
  });
  const [smishing, setSmishing] = useState(
    data[messageType as keyof typeof data] ?? {},
  );
  const [currentMessageList, setCurrentMessageList] = useState<MessageType[]>([
    smishing?.message_list[0],
  ]);

  // 모달 데이터 format
  const formattedModalTitle = useFormattedContent(modalData.title, 'text-2xl');
  const formattedModalDetail = useFormattedContent(modalData.detail, 'text-xl');

  // 문자 메세지 추가 딜레이
  const addMessagesWithDelay = useCallback(
    async (newMessages: MessageType[]) => {
      if (newMessages.length > 0) {
        setCurrentMessageList((prevMessages) => [
          ...prevMessages,
          newMessages[0],
        ]);
        scrollToBottom();

        for (let i = 1; i < newMessages.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          setCurrentMessageList((prevMessages) => [
            ...prevMessages,
            newMessages[i],
          ]);
          scrollToBottom();
        }
      }
    },
    [],
  );

  const handleButtonClick = (choice: string) => {
    const selectedData = data[choice];

    // 엔딩 데이터가 존재하는 경우 엔딩 페이지로 전환
    if (selectedData?.ending) {
      setIsEnding(true);
      setModalData({
        title: selectedData.ending.title,
        detail: selectedData.ending.detail,
      });
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
        setSmishing(selectedData); // smishing 데이터 업데이트
        const newMessages = selectedData.message_list.slice(1);
        addMessagesWithDelay(newMessages);
      }
    }
  };

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='flex flex-col'>
      <div className='fixed left-0 top-0 z-10 w-full'>
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
      <div className='mt-16 flex flex-grow flex-col overflow-y-auto p-5 pb-56'>
        {!isEnding ? (
          <div className='flex flex-1 flex-col overflow-y-auto p-4'>
            {currentMessageList.map((message, index) => (
              <MessageBubble
                key={index}
                imgUrl={message.img}
                content={message.text}
                time={message.time}
                isUser={message.is_reply}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <SmishingEnding
            sender={smishing?.sender}
            title={formattedModalTitle}
            detail={formattedModalDetail}
            onRetry={() => setIsEnding(false)}
          />
        )}
      </div>
      {!isEnding && (
        <div className='fixed bottom-0 w-full bg-white p-4'>
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
        />
      )}
    </div>
  );
};

export default SmishingMessageDetail;
