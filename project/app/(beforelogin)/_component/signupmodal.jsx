'use client'
import React, { useMemo } from 'react';
import styles from '@/app/modules/signup.module.scss';
import Agree from './agree';
import usePolicyStore from '@/app/zustand/policyStore';
import Email from './email';
import Password from './password';
import Nickname from './nickname';
import bglogo from '@/app/public/image/bglogo.png';
import Image from 'next/image';

const { container, title, main } = styles;

export default function Modal() {
  const { currentStage } = usePolicyStore();
  console.log("rerendered")
  const stageComponent = useMemo(() => {
    switch (currentStage) {
      case 'agree':
        return <Agree />;
      case 'email':
        return <Email />;
      case 'password':
        return <Password />;
      case 'nickname':
        return <Nickname />;
      default:
        return null;
    }
  }, [currentStage]);

  return (
    <div className={container}>
      <h1 className={title}>
        <p>회원가입 </p>
        <Image 
          src={bglogo}
          alt="Company Logo" 
          width={25} 
          height={25}
          priority
        />
      </h1>

      <div className={main}>
        {stageComponent}
      </div>
    </div>
  );
}