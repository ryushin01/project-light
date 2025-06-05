"use client";

import React, {
  ChangeEvent,
  ReactNode,
  Suspense,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { Alert, Button, Input, Loading } from "@components";
import { useDisclosure, useFlutterBridgeFunc } from "@hooks";
import { authAtom } from "@stores";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Image from "next/image";
import { KeyImage, WooriBankIcon } from "@icons";
import { WooriFooter } from "@components/woori-layout";
import makeSeverForm from "@app/my-case/estm/info/makeServerForm";
import { useSetAtom } from "jotai/index";

type TAuth = {
  membNo: string;
  membNm: string;
  reptMembNo: string;
  reptMembNm: string;
  bizNo: string;
  officeNm: string;
  profileImgPath: string;
  accessToken: string;
  refreshToken: string;
  permCd: string;
  dvceUnqNum: string;
};

const BYPASS = {
  bypassCount: 5,
  bypassKey: "bankle0421",
};

function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authInfo, saveAuthInfo] = useAtom(authAtom);
  const [membNo, setMembNo] = useState("");
  const [editMembNo, setEditMembNo] = useState("");
  const [pinNo, setPinNo] = useState("");
  const [isError, setIsError] = useState(false);
  const [updateComponent, setUpdateComponent] = useState(false);
  const { nextjsFunc, value } = useFlutterBridgeFunc();
  const { isOpen, open, close } = useDisclosure();
  const [isAccess, setIsAccess] = useState<boolean>(false);
  const [bypassValue, setBypassValue] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const counter = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    if (count === BYPASS.bypassCount) {
      open();
    }
  }, [count]);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["log-in"],
    queryFn: (): Promise<TAuth> =>
      fetch(
        // `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/login?membNo=${membNo}&pwd=282011&fcmId=ZdadV1234GYH%26%25%24%23%24Ssdfgsdfgsd%21%24%24444423444&dvceUnqNum=System&method=PIN`,
        // `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/login?membNo=${membNo}&pwd=123456&fcmId=ZdadV1234GYH%26%25%24%23%24Ssdfgsdfgsd%21%24%24444423444&dvceUnqNum=System&method=PIN`,
        `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/login?membNo=${
          membNo === "" ? editMembNo : membNo
        }&pwd=${pinNo}&fcmId=ZdadV1234GYH%26%25%24%23%24Ssdfgsdfgsd%21%24%24444423444&dvceUnqNum=System&method=BIO`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => res.data),
    enabled: false,
  });

  useEffect(() => {
    if (!!value.data && value.mode === "LOGIN") {
      saveAuthInfo(value.data as any);
      sessionStorage.setItem("flutter", `${value.mode} ${value.data}`);
    }
    if (!!data) {
      saveAuthInfo({
        ...data,
        isRept: data.permCd === "00" || data.permCd === "01",
      });
    }
  }, [value, data]);

  useEffect(() => {
    window.nextjsFunc = nextjsFunc;
    setUpdateComponent(!updateComponent);

    /iPhone/i.test(navigator?.userAgent)
      ? sessionStorage.setItem("isIos", "true")
      : sessionStorage.setItem("isIos", "");
  }, []);

  useEffect(() => {
    pathSpy();
  }, [pathname]);

  const pathSpy = () => {
    const storage = globalThis?.sessionStorage;
    const prevPath = storage.getItem("currentPath");

    if (!storage) {
      return;
    }

    storage.setItem("prevPath", prevPath!);
    storage.setItem("currentPath", globalThis?.location.pathname);
  };

  const mode = value.mode ?? "nothing";
  const flutterData = JSON.stringify(value.data);

  const authData =
    typeof window !== "undefined" && sessionStorage.getItem("auth");

  if (authInfo.bizNo && authInfo.bizNo !== "") {
    return <>{children}</>;
  }

  // 웹뷰 페이지일 경우 로그인 페이지 X
  if (
    pathname.includes("/view/cover") ||
    pathname.includes("/view/agreement") ||
    pathname.includes("/view/searchestm") ||
    pathname.includes("/view/searchcntr") ||
    pathname.includes("/view/link") ||
    pathname.includes("/view/pdf-viewer") ||
    pathname.includes("/terms/privacy") ||
    pathname.includes("/account/delete")
  ) {
    return <>{children}</>;
  }

  let isApp;

  if (typeof window !== "undefined") {
    if (/Android|iPhone/i.test(navigator?.userAgent)) {
      isApp = true;
    }
  }

  if (!authData && authData === null && updateComponent) {
    return (
      <Suspense fallback={<Loading />}>
        {isAccess ? (
          <div
            className={`${
              isApp ? "hidden" : "flex"
            } w-full h-full flex-col justify-center flex-1 items-center px-4`}
          >
            {/* 2025.05.26 상단 select에 없는 회원 정보로 로그인해야 할 때 직접 입력해서 들어가도록 inputfield 추가*/}
            {/*
              # pinNo | editMembNo | membNo 초기값 ""
              1. select에서 회원번호 선택 없이 로그인버튼 누르면 회원번호란 에러표시 및 로그인 X
              2. pinNo 입력안하면 자동으로 147852 set
              3. refetch 시 입력정보 초기화
          */}
            <div className={`w-full h-1 mt-4 mb-56`}>
              <div className="w-full mt-2 mb-4">
                <Input.Label htmlFor="">회원번호</Input.Label>
                <Input.InputField
                  value={editMembNo ?? ""}
                  placeholder="회원번호 입력"
                  thousandSeparator={false}
                  leadingZero={true}
                  maxLength={20}
                  styleType={isError ? "error" : "default"}
                  onChange={(e) => {
                    setIsError(false);
                    setEditMembNo(e.target.value.replace(/[^\d]/g, ""));
                  }}
                />
                <span
                  className={`${isError ? "block" : "hidden"} text-kos-red-500`}
                >
                  회원번호를 입력해주세요.
                </span>
              </div>
              <div className="w-full">
                <Input.Label htmlFor="">PIN 번호</Input.Label>
                <Input.InputField
                  value={pinNo ?? ""}
                  placeholder="PIN 번호 입력"
                  thousandSeparator={false}
                  leadingZero={true}
                  maxLength={20}
                  // styleType={isError ? "error" : "default"}
                  onChange={(e) => {
                    setPinNo(e.target.value.replace(/[^\d]/g, ""));
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => {
                if (membNo === "" && editMembNo === "") {
                  setIsError(true);
                  return;
                }
                // pinNo 없으면 자동으로 147852 set
                if (pinNo === "") {
                  setPinNo("147852");
                }
                refetch();
                // refetch 이후 입력값 전부 초기화
                setPinNo("");
                setMembNo("");
                setEditMembNo("");
                setIsError(false);
              }}
              style={{ lineBreak: "anywhere" }}
              className="bg-kos-orange-500 rounded-2xl text-kos-white px-6 py-3 w-full"
            >
              LOG IN 😶‍🌫️ {mode}
              {/* <br />✨{flutterData} */}
            </button>
          </div>
        ) : (
          <main className="flex flex-1 flex-col justify-center items-center relative w-full py-8 px-4">
            <h1>
              <Image src={WooriBankIcon} alt="우리은행 로고" />
            </h1>

            <h2 className="mt-5 py-3 text-[32px] leading-[34px] font-semibold -tracking-[0.64px]">
              대출 사후 서류 제출
            </h2>

            <div className="relative py-24">
              <Image src={KeyImage} alt="열쇠 이미지" />

              <button
                type="button"
                className="_enter-button absolute bottom-40 -left-12 w-10 h-10 cursor-default"
                onClick={counter}
              >
                Enter
              </button>
            </div>

            <WooriFooter />
          </main>
        )}

        <Alert
          isOpen={isOpen}
          title={
            "관리자 키를 입력하세요.\n(3회 이상 잘못 입력 시 접근 차단됩니다.)"
          }
          confirmText="✓"
          confirmCallBack={() => {
            if (bypassValue === BYPASS.bypassKey) {
              setIsAccess(true);
            }

            close();
            setCount(0);
            setBypassValue("");
          }}
          bodyText={
            <>
              <Input.InputField
                value={bypassValue}
                thousandSeparator={false}
                leadingZero={true}
                maxLength={30}
                styleType={isError ? "error" : "default"}
                onChange={(e) => {
                  setBypassValue(e.target.value);
                }}
              />
            </>
          }
        />
      </Suspense>
    );
  }

  if (isLoading) {
    // 로딩이 끝난 후에는 아무것도 렌더링하지 않음
    return <Loading />;
  }

  return null;
}

export default AuthProvider;
