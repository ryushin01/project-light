"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Input, Loading, Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";
import { useFetchApi, useVirtualKeyboard } from "@hooks";
import { scrollToInput } from "@utils";
import { toastState } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import Cookies from "js-cookie";

type InputFieldsType = {
  id: string;
  type: "text" | "number";
  label: string;
  placeholder: string;
  maxLength: number;
};

const inputFields: InputFieldsType[] = [
  {
    id: "sellerNm",
    type: "text",
    label: "매도인명(법인명)",
    placeholder: "매도인 또는 법인명 입력",
    maxLength: 30, // Text Field 공통 가이드: 30자 초과 시 텍스트 입력 제어
  },
  {
    id: "sellerBirthDt",
    type: "number",
    label: "매도인 생년월일(법인등록번호)",
    placeholder: "생년월일 또는 법인등록번호 6자리 입력",
    maxLength: 6,
  },
];

export default function SellerInfo() {
  const { fetchApi } = useFetchApi();
  const { expandedRef } = useVirtualKeyboard();
  const callToast = useSetAtom(toastState);

  // 2025.05.30 대체서류등록 후 플러터에서 돌아왔을때, loanNo(여신번호) / regType(등기구분코드) 정보 누락으로 인해 쿠키에서 데이터 불러오기 추가
  const loanNo = Cookies.get("loanNo")!;
  const regType = Cookies.get("regType")!;

  const [form, setForm] = useState({
    sellerNm: "",
    sellerBirthDt: "",
  });

  // 비활성화 조건: 두 입력 필드 중 하나가 비어 있거나, 매도인 생년월일(법인등록번호) 필드의 입력 값이 6자리 아닌 경우
  const isDisabled =
    Object.values(form).some((field) => field === "") ||
    form.sellerBirthDt.length !== 6;

  const { mutate, isPending } = useMutation({
    mutationKey: ["post-seller-info"],
    mutationFn: async (body: { sellerNm: string; sellerBirthDt: string }) => {
      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/savesellerinfo`,
        method: "post",
        body: { ...body, loanNo },
      });
      return response.json();
    },
    onSuccess(data) {
      console.log("data => ", data);

      // 매도인 정보 저장 성공 응답 시 Flutter 서류 이미지 등록 프로세스 진행
      if (data?.code === "00") {
        // @ts-ignore
        window.flutter_inappwebview.callHandler("flutterFunc", {
          mode: "IMAGE",
          data: {
            wkCd: "IMAGE_BIZ",
            attcFilCd: "1",
            lndHndgSlfDsc: "1",
            loanNo: loanNo,
            regType: regType,

            // 반려 시: "Y" / 반려 외: "N" > 반려 시에만 returnYn: "Y"로 데이터 전달
            ...(data?.data === "Y" && { returnYn: "Y" }),
          },
        });
      } else {
        // NOTE: 공통 에러 핸들링(useFetchApi.ts)으로 인해 여신번호 미수급 시 에러 메시지를 보여줄 수 없다는 이슈 존재
        callToast({
          msg: data?.msg,
          status: "notice",
        });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const inputMonitor = (event: ChangeEvent<HTMLFormElement>) => {
    const { id, value } = event.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(form);
  };

  return (
    <>
      {isPending && <Loading />}

      <section className="flex flex-col justify-between grow w-full h-full">
        <div ref={expandedRef} className="flex flex-col flex-1">
          <Typography
            type={Typography.TypographyType.H1}
            color="text-kos-gray-800"
          >
            매도인 정보를 입력하고
            <br />
            해당하는 서류를 제출해 주세요
          </Typography>

          <Typography
            type={TypographyType.H2}
            color={"text-kos-gray-800"}
            className="pt-6 pb-3"
          >
            매도인 정보
          </Typography>

          <form onChange={inputMonitor} onSubmit={handleSubmit}>
            <fieldset>
              <legend className="sr-only">매도인 정보 입력 양식</legend>
              <div className="flex flex-col gap-y-6">
                {inputFields.map((field) => {
                  const { id, type, label, placeholder, maxLength } = field;

                  return (
                    <div key={id} className="flex flex-col gap-y-1 text-[0px]">
                      <label
                        htmlFor={id}
                        className="text-xs font-semibold text-kos-gray-600"
                      >
                        {label}
                      </label>
                      <Input.InputField
                        id={id}
                        name={id}
                        inputType={type}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        thousandSeparator={false}
                        onFocus={scrollToInput}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="fixed w-full left-0 bottom-0 flex p-4 bg-kos-white">
                <Button.CtaButton
                  type="submit"
                  size="XLarge"
                  state="On"
                  disabled={isDisabled}
                >
                  서류 제출하기
                </Button.CtaButton>
              </div>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}
