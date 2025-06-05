import Image from "next/image";

const MANUAL_IMAGE_LIST = [
  {
    id: 'manual_image_1',
    src: '/images/manual/slide1.jpg',
    alt: "코스 앱 사용 설명서: 인트로",
  },
  {
    id: 'manual_image_2',
    src: '/images/manual/slide2.jpg',
    alt: "코스 앱 사용 설명서: 목차",
  },
  {
    id: 'manual_image_3',
    src: '/images/manual/slide3.jpg',
    alt: "코스 앱 사용 설명서: 사용하기 전에",
  },
  {
    id: 'manual_image_4',
    src: '/images/manual/slide4.jpg',
    alt: "코스 앱 사용 설명서: 사용하기 전에: 1. 코스 앱 설치하기",
  },
  {
    id: 'manual_image_5',
    src: '/images/manual/slide5.jpg',
    alt: "코스 앱 사용 설명서: 사용하기 전에: 2. 회원가입 하기",
  },
  {
    id: 'manual_image_6',
    src: '/images/manual/slide6.jpg',
    alt: "코스 앱 사용 설명서: 사용하기 전에: 3. 사무소 등록하기 [대표 법무사]",
  },
  {
    id: 'manual_image_7',
    src: '/images/manual/slide7.jpg',
    alt: "코스 앱 사용 설명서: 사용하기 전에: 3. 사무소 등록하기 [소속직원]",
  },
  {
    id: 'manual_image_8',
    src: '/images/manual/slide8.jpg',
    alt: "코스 앱 사용 설명서: 사용하기 전에: 4. 첫 화면 살펴보기",
  },
  {
    id: 'manual_image_9',
    src: '/images/manual/slide9.jpg',
    alt: "코스 앱 사용 설명서: 사용하기",
  },
  {
    id: 'manual_image_10',
    src: '/images/manual/slide10.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 1. 내 사건 목록 살펴보기",
  },
  {
    id: 'manual_image_11',
    src: '/images/manual/slide11.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 2. 사건상세 살펴보기 [정보 등록]",
  },
  {
    id: 'manual_image_12',
    src: '/images/manual/slide12.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 2. 사건상세 살펴보기 [사건 진행]",
  },
  {
    id: 'manual_image_13',
    src: '/images/manual/slide13.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 3. 상환금 수령용 계좌 등록하기",
  },
  {
    id: 'manual_image_14',
    src: '/images/manual/slide14.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 4. 견적서",
  },
  {
    id: 'manual_image_15',
    src: '/images/manual/slide15.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 5. 등기정보",
  },
  {
    id: 'manual_image_16',
    src: '/images/manual/slide16.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 6. 지급정보 1",
  },
  {
    id: 'manual_image_17',
    src: '/images/manual/slide17.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 6. 지급정보 2",
  },
  {
    id: 'manual_image_18',
    src: '/images/manual/slide18.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 7. 견적서 확정",
  },
  {
    id: 'manual_image_19',
    src: '/images/manual/slide19.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 8. 대출금 요청",
  },
  {
    id: 'manual_image_20',
    src: '/images/manual/slide20.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 9. 상환말소 1",
  },
  {
    id: 'manual_image_21',
    src: '/images/manual/slide21.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 9. 상환말소 2",
  },
  {
    id: 'manual_image_22',
    src: '/images/manual/slide22.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 10. 접수번호 등록 1",
  },
  {
    id: 'manual_image_23',
    src: '/images/manual/slide23.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 10. 접수번호 등록 2",
  },
  {
    id: 'manual_image_24',
    src: '/images/manual/slide24.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 11. 설정서류",
  },
  {
    id: 'manual_image_25',
    src: '/images/manual/slide25.jpg',
    alt: "코스 앱 사용 설명서: 내 사건 사용하기: 12. 보정서류",
  },
  {
    id: 'manual_image_26',
    src: '/images/manual/slide26.jpg',
    alt: "코스 앱 사용 설명서: 사건수임 사용하기: 1. 추가정보 등록하기 [대표 법무사]",
  },
  {
    id: 'manual_image_27',
    src: '/images/manual/slide27.jpg',
    alt: "코스 앱 사용 설명서: 사건수임 사용하기: 1. 추가정보 등록하기 [소속직원]",
  },
  {
    id: 'manual_image_28',
    src: '/images/manual/slide28.jpg',
    alt: "코스 앱 사용 설명서: 사건수임 사용하기: 2. 지역 선택하기",
  },
  {
    id: 'manual_image_29',
    src: '/images/manual/slide29.jpg',
    alt: "코스 앱 사용 설명서: 사건수임 사용하기: 3. 사건수임 목록 살펴보기",
  },
  {
    id: 'manual_image_30',
    src: '/images/manual/slide30.jpg',
    alt: "코스 앱 사용 설명서: 사건수임 사용하기: 4. 사건 수임하기",
  },
  {
    id: 'manual_image_31',
    src: '/images/manual/slide31.jpg',
    alt: "코스 앱 사용 설명서: 설정하기",
  },
  {
    id: 'manual_image_32',
    src: '/images/manual/slide32.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 1. 개인정보 변경하기",
  },
  {
    id: 'manual_image_33',
    src: '/images/manual/slide33.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 2. 사무소 변경하기",
  },
  {
    id: 'manual_image_34',
    src: '/images/manual/slide34.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 3. 사무소 전화번호 수정하기",
  },
  {
    id: 'manual_image_35',
    src: '/images/manual/slide35.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 4. E-FORM ID 수정하기",
  },
  {
    id: 'manual_image_36',
    src: '/images/manual/slide36.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 5. 보험가입증명서 보기",
  },
  {
    id: 'manual_image_37',
    src: '/images/manual/slide37.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 6. 상환금 수령용 계좌 추가 등록하기",
  },
  {
    id: 'manual_image_38',
    src: '/images/manual/slide38.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 7. 견적 안내문 작성하기",
  },
  {
    id: 'manual_image_39',
    src: '/images/manual/slide39.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 8. 법무 수수료 안내용 계좌 수정하기",
  },
  {
    id: 'manual_image_40',
    src: '/images/manual/slide40.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 9. 소속직원 가입 요청 처리하기 [승인]",
  },
  {
    id: 'manual_image_41',
    src: '/images/manual/slide41.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 9. 소속직원 가입 요청 처리하기 [거절]",
  },
  {
    id: 'manual_image_42',
    src: '/images/manual/slide42.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 10. 소속직원 권한 변경하기 [운영 관리자 지정]",
  },
  {
    id: 'manual_image_43',
    src: '/images/manual/slide43.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 10. 소속직원 권한 변경하기 [운영 관리자 해제]",
  },
  {
    id: 'manual_image_44',
    src: '/images/manual/slide44.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 11. 소속직원 탈퇴 처리하기",
  },
  {
    id: 'manual_image_45',
    src: '/images/manual/slide45.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 12. PIN 번호 변경하기",
  },
  {
    id: 'manual_image_46',
    src: '/images/manual/slide46.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 13. Face ID 등록하기",
  },
  {
    id: 'manual_image_47',
    src: '/images/manual/slide47.jpg',
    alt: "코스 앱 사용 설명서: 설정하기: 14. 회원 탈퇴하기",
  },
  {
    id: 'manual_image_48',
    src: '/images/manual/slide48.jpg',
    alt: "코스 앱 사용 설명서: 아웃트로",
  }
]

export default function PdfViewer() {

  return (
    <>
      <main>
        <ul>
          {MANUAL_IMAGE_LIST.map((image) => {
            const {id, src, alt} = image;
            return (
              <li key={id} className="relative w-full aspect-video border-b-8 border-black last:border-b-0">
                <Image src={src} alt={alt} quality={100} fill />
              </li>
            )
          })}
        </ul>
      </main>
    </>
  );
}
