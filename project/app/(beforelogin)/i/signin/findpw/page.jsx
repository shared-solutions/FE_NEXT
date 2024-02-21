'use client'
import FindPasswordEmailInput from "@/app/(beforelogin)/_component/findPasswordEmailInput"
import React, { useMemo } from 'react';
import styles from '@/app/modules/signup.module.scss';

import VerifyEmail from "@/app/(beforelogin)/_component/verifyEmail";
import UpdatePassword from "@/app/(beforelogin)/_component/updatePassword";
import useFindPwStore from "@/app/zustand/findPwStore";

const { container} = styles;

export default function Modal() {
  const { currentStage } =useFindPwStore();
  console.log("rerendered")
  const stageComponent = useMemo(() => {
    switch (currentStage) {
      case 'EmailInput':
        return <FindPasswordEmailInput />;
      case 'Verify':
        return <VerifyEmail />;
      case 'password':
        return <UpdatePassword />;
      default:
        return null;
    }
  }, [currentStage]);

  return (
    <div className={container}>
        {stageComponent}
    </div>
  );
}