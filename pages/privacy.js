import { Box, Container, Heading, Table, Tbody, Text, th, thead, Tr, td, Link, TableContainer } from '@chakra-ui/react';
import Head from 'next/head';

export default function terms() {
  return (
    <>
      <Head>
        <title>개인정보 처리방침</title>
      </Head>
      <Container
        shadow='md'
        maxW='container.lg'
        mb='4'
        px='8'
        py='4'
        className='markdown privacy'
        fontFamily='sans-serif'
        bg='white'
        mt='80px'
      >
        <Heading as='h1' textAlign='center' fontSize='4xl'>
          핑거레이트 개인정보 처리방침
        </Heading>
        <p>
          주식회사 GG56 코리아(이하 회사)는 ｢개인정보 보호법｣ 제30조에 따라 이용자의 개인정보를 보호하고 이와 관련한
          고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립 및 공개합니다.
        </p>
        <h2>개인정보의 처리목적</h2>
        <p>
          회사는 다음의 목적을 위하여 개인정보를 처리하며, 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지
          않습니다. 이용 목적이 변경되는 경우에는 ｢개인정보 보호법｣ 제18조에 따라 별도의 동의를 받는 등 필요한 조치를
          이행할 예정입니다.
        </p>
        <h3>회원 가입 및 로그인, 관리</h3>
        <p>
          회원 가입의사 확인과 회원제 서비스 제공에 따른 회원자격 유지 및 관리, 만 14세 미만 아동의 개인정보 처리 시
          법정대리인의 동의여부 확인, 서비스 부정이용 방지, 각종 고지와 통지를 목적으로 개인정보를 처리합니다.
        </p>
        <h3>재화 또는 서비스 제공</h3>
        <p>본인 인증, 결제, 서비스 및 콘텐츠, 광고를 포함한 맞춤형 서비스 제공을 목적으로 개인정보를 처리합니다.</p>
        <h3>고충처리</h3>
        <p>
          이용자의 신원 확인, 문의사항 확인, 사실조사를 위한 연락, 통지, 처리결과 통보의 목적으로 개인정보를 처리합니다.
        </p>
        <h3>제휴 및 제안</h3>
        <p>
          제휴 및 제안 시 이용자 또는 사업자가 작성한 내용을 검토하고, 필요 시 연락을 위한 목적으로 개인정보를
          처리합니다.
        </p>
        <h2>개인정보의 처리 및 보유기간</h2>
        <p>
          ① 회사는 법령에 명시되어 있거나 이용자로부터 개인정보 수집 시 동의 받은 개인정보의 보유 및 이용기간 내에서
          개인정보를 처리 및 보유합니다.
        </p>
        <p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
        <ol>
          <li>
            회원 가입 및 로그인, 관리 : 회원 탈퇴 시 또는 SNS 연동 해제 시까지
            <br />
            <p>다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지</p>
            <ol>
              <li>관계 법령 위반에 따른 수사, 조사 등이 진행 중인 경우에는 해당 수사, 조사 종료 시까지</li>
              <li>서비스 이용에 따른 채권, 채무관계 잔존 시에는 해당 채권, 채무관계 정산 시까지</li>
              <li>법정대리인의 동의 시 동의 받은 날로부터 1년</li>
              <li>회원 탈퇴 후 복구 요청 기간 종료 시까지 (회원 탈퇴일로부터 90일)</li>
            </ol>
          </li>
          <li>재화 또는 서비스 제공 : 재화, 서비스 공급 완료 또는 서비스 이용 종료 시까지</li>
          <li>친구 초대 : ‘친구 초대’ 기능의 서비스 종료 또는 회원탈퇴 시까지</li>
          <li>고충처리 : 고충 처리 완료 시까지</li>
          <li>제휴 제안 : 제휴 및 제안 검토 완료 후 6개월</li>
        </ol>
        <p>다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지</p>
        <TableContainer whiteSpace='initial'>
          <table>
            <thead>
              <tr>
                <th>관련법령</th>
                <th>수집 정보</th>
                <th>보유기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>통신비밀보호법</td>
                <td>서비스 이용 관련 정보(접속로그)</td>
                <td>3개월</td>
              </tr>
              <tr>
                <td rowSpan='3'>
                  전자상거래
                  <br />
                  등에서의
                  <br />
                  소비자 보호에
                  <br />
                  관한 법률
                </td>
                <td>소비자의 불만 또는 분쟁처리에 관한 기록</td>
                <td>3년</td>
              </tr>
              <tr>
                <td>계약 또는 청약철회 등에 관한 기록</td>
                <td>5년</td>
              </tr>
              <tr>
                <td>대금결제 및 재화 등의 공급에 관한 기록</td>
                <td>5년</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
        <h2>개인정보의 제3자 제공</h2>
        <p>
          ① 회사는 이용자의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의,
          법률의 특별한 규정 등 ｢개인정보 보호법｣ 제17 조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
        </p>
        <p>② 회사는 제3자에게 개인정보를 제공하지 않으며, 제공하게 될 경우 이용자에게 동의를 받겠습니다.</p>
        <h2>개인정보처리의 위탁</h2>
        <p>① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
        <TableContainer whiteSpace='initial'>
          <table>
            <thead>
              <tr>
                <th>수탁업체</th>
                <th>위탁하는 업무내용 </th>
                <th>개인정보의 보유 및 이용기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  ㈜브이알미디어
                  <br />
                  서울시 금천구 가산디지털1로 225, 에이스 가산포휴 1120-1122호
                  <br />
                  +82 2 6242 8416
                </td>
                <td>핑거레이트 운영, 시스템 유지보수, 헬프데스크 등 운영지원</td>
                <td>서비스 이용 종료 또는 위탁계약 종료 시까지</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
        <p>
          ③ 회사는 위탁계약 체결 시 ｢개인정보 보호법｣ 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적 ·
          관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에
          명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
        </p>
        <p>
          ④ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
        </p>
        <h2>이용자와 법정대리인의 권리·의무 및 행사방법</h2>
        <p>① 이용자는 회사에 대해 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
        <ol>
          <li>
            개인정보 열람 / 정정
            <br />
            <ul>
              <li>
                설정 &gt; 계정 관리 &gt; 해당 메뉴 선택 시
                <br />
                <ul>
                  <li>휴대폰 번호 : 휴대폰 번호</li>
                  <li>이메일 : 이메일</li>
                  <li>비밀번호 변경 : 비밀번호</li>
                  <li>활동명 : 활동명 (30일 이내 1회만 가능)</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            개인정보 삭제 (회원탈퇴) : 설정 &gt; 계정 관리 &gt; 계정 상세 &gt; 계정 탈퇴 하기
            <br />
            <ul>
              <li>회원 가입/로그인 정보, 프로필 정보</li>
            </ul>
          </li>
          <li>
            SNS 연동 해제 <br />
            <ul>
              <li>
                Google : 설정 &gt; 계정관리 &gt; 데이터 및 개인정보보호 &gt; 내계정에 액세스 권한이 있는 서드파티 앱
                &gt; 액세스 권한 삭제
              </li>
              <li>
                Apple : 설정 &gt; 암호 및 보안 &gt; Apple ID를 사용하는 앱 &gt; 연동을 해제할 앱 선택 &gt; Apple ID 사용
                중단
              </li>
              <li>
                Facebook : 메뉴 &gt; 설정 &gt; 보안 &gt; 앱과 웹사이트 &gt; Facebook 계정으로 로그인한 앱 및 웹사이트
                &gt; 연동을 해제할 앱 선택 &gt; 앱 삭제
              </li>
              <li>
                KAKAO TALK : 카카오 앱 &gt; 더보기 &gt; 개인/보안 &gt; 카카오 계정 &gt; 연결된 서비스관리 &gt; 연동을
                해제할 앱 선택 &gt; 연결 끊기 또는 모든 정보 삭제 선택
              </li>
              <li>NAVER : ID &gt; 이력관리 &gt; 연결된 서비스 관리 &gt; 연동을 해제할 앱 선택 &gt; 철회하기</li>
            </ul>
          </li>
        </ol>
        <p>
          ② 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제4항, 제37조 제2항에 의하여 이용자의 권리가 제한될
          수 있습니다.
        </p>
        <p>
          ③ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를
          요구할 수 없습니다.
        </p>
        <p>
          ④ 회사는 이용자 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가
          본인이거나 정당한 대리인인지를 확인할 수 있습니다.
        </p>
        <p>
          ⑤ 제4항에 따른 권리행사 주체가 대리인(이용자의 법정대리인이나 위임을 받은 자)인 경우 “개인정보 처리 방법에
          관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
        </p>
        <h2>처리하는 개인정보 항목</h2>
        <p>① 회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
        <TableContainer whiteSpace='initial'>
          <table>
            <tbody>
              <tr>
                <td>구분</td>
                <td>수집·이용목적</td>
                <td>필수/선택</td>
                <td colSpan='2'>수집 및 이용항목</td>
              </tr>
              <tr>
                <td>이용자 나이 확인</td>
                <td>만 14세 미만 아동 확인</td>
                <td>필수</td>
                <td colSpan='2'>생년월일, 성별</td>
              </tr>
              <tr>
                <td>법정대리인 동의 시</td>
                <td>법정대리인 동의 확인</td>
                <td>필수</td>
                <td colSpan='2'>법정대리인 휴대폰번호</td>
              </tr>
              <tr>
                <td rowSpan='7'>로그인</td>
                <td rowSpan='7'>
                  회원가입 및 로그인
                  <br />
                  (SNS 연동)
                </td>
                <td rowSpan='7'>필수/선택</td>
                <td>FINGERATE ID</td>
                <td>(필수) FINGERATE ID, 비밀번호</td>
              </tr>
              <tr>
                <td>전화번호</td>
                <td>(필수) 전화번호, 비밀번호, FINGERATE ID</td>
              </tr>
              <tr>
                <td>이메일</td>
                <td>(필수) 이메일, 비밀번호, FINGERATE ID</td>
              </tr>
              <tr>
                <td>Facebook</td>
                <td>
                  (필수) ID, FINGERATE ID
                  <br />
                  (선택) 이메일
                </td>
              </tr>
              <tr>
                <td>KAKAO Talk</td>
                <td>
                  (필수) ID, FINGERATE ID
                  <br />
                  (선택) 이메일
                </td>
              </tr>
              <tr>
                <td>Google</td>
                <td>(필수)ID, 이름, 성별, FINGERATE ID</td>
              </tr>
              <tr>
                <td>Apple</td>
                <td>
                  (필수) ID, 이름
                  <br />
                  (선택) 이메일, FINGERATE ID
                </td>
              </tr>
              <tr>
                <td rowSpan='8'>문의하기</td>
                <td rowSpan='8'>이용자 문의 및 고충 처리</td>
                <td>선택</td>
                <td colSpan='2'>이메일 (공통)</td>
              </tr>
              <tr>
                <td rowSpan='8'>필수</td>
                <td>계정 관련</td>
                <td rowSpan='2'>FINGERATE ID</td>
              </tr>
              <tr>
                <td>결제 관련</td>
              </tr>
              <tr>
                <td>저작권 신고</td>
                <td>이름, 회사(기관)명, 연락처, 저작자와의 관계</td>
              </tr>
              <tr>
                <td>환불 관련</td>
                <td>FINGERATE ID, 이름, 연락처(메일주소, 전화번호)</td>
              </tr>
              <tr>
                <td>미성년자 결제 환불 요청</td>
                <td>FINGERATE ID, 법정대리인의 결제정보(이름, 생년월일), 주소, 우편번호, 가족 관계</td>
              </tr>
              <tr>
                <td>Reporting underage users(US)</td>
                <td>FINGERATE ID, 생년월일</td>
              </tr>
              <tr>
                <td>제휴제안</td>
                <td>회사(기관)명, 이름, 연락처(메일주소, 전화번호)</td>
              </tr>
              <tr>
                <td>크리에이터 되기</td>
                <td>크리에이터 등록</td>
                <td colSpan='2'>FINGERATE ID, 이름, 국가, 이메일, 전화번호</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
        <p>② 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.</p>
        <p className='indent'>IP주소, 쿠키, 서비스 이용기록,</p>
        <p>③ 서비스 이용과정에서 개인정보는 아니지만 아래의 정보가 생성되어 수집될 수 있습니다.</p>
        <p className='indent'>
          광고식별자, 방문기록, 기기 정보(유형, 모델명, OS 버전, APP 버전, 기기 식별자, 언어 및 국가), 캐릭터
          이름/성별/국가/프로필 사진, 서포트코드
        </p>
        <p>
          ④ 회사의 서비스를 이용하여 캐릭터 및 관련 콘텐츠를 생성할 경우, 이용자의 카메라 기능을 이용하지만 이용자의
          사진을 복사하거나 회사의 서버로 전송하지 않습니다.
        </p>
        <h2>개인정보의 파기</h2>
        <p>
          ① 회사는 이용자로부터 동의 받은 개인정보의 보유기간이 경과하거나 처리목적을 달성하여 더 이상 개인정보가
          필요하지 않게 된 경우 지체없이 해당 개인정보를 파기합니다.
        </p>
        <p>
          ② 제1항 해당됨에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의
          데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다. (법령에 따른 보관 기간은 제2조를 참조하시기
          바랍니다)
        </p>
        <p>③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
        <ol>
          <li>
            파기절차
            <br />
            <ol>
              <li>
                개인정보 도용 등으로 인한 피해 발생 시 복구와 피해자 보호 등을 위하여 회원가입 시 수집한 개인정보를 14일
                동안 임시로 보관할 수 있습니다.
              </li>
              <li>
                회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를
                파기합니다.
              </li>
            </ol>
          </li>
          <li>
            파기방법
            <br />
            <ol>
              <li>전자적 파일의 형태 : 복구 및 재생이 되지 않도록 기술적인 방법 이용</li>
              <li>종이 문서 : 분쇄기로 분쇄하거나 소각</li>
            </ol>
          </li>
        </ol>
        <h2>개인정보의 안전성 확보조치</h2>
        <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
        <h3>관리적 조치</h3>
        <p>내부관리계획 수립 및 시행, 정기적 임직원 교육, 정기적인 접속기록 점검, 수탁사 점검 등</p>
        <h3>기술적 조치</h3>
        <p>
          개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 내부 관리계획에 따른 암호화 (전송구간 및 저장 시),
          보안프로그램 설치
        </p>
        <h3>물리적 조치</h3>
        <p>데이터센터, 자료보관실 등의 접근통제</p>
        <h2>개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항</h2>
        <p>
          회사는 이용자들에게 적합하고 보다 유용한 서비스와 광고 서비스(맞춤형 광고 포함)를 제공하기 위해서 이용자의
          광고 식별자와 분석 소프트웨어를 사용하고 있습니다.
        </p>
        <ol className='dashed-ul'>
          <li>
            광고 식별자는 이용자가 소유한 스마트폰 및 태블릿 PC의 OS 설정에서 광고에 관한 기능을 활성화한 경우 자동으로
            수집되며, 기기의 설정을 변경하거나 광고 플랫폼 사업자의 Opt-Out 기능을 활용함으로써 광고 식별자가 관심
            사항에 기반하는 광고에 사용되지 못하도록 거부할 수 있습니다.
            <br />
            <br />
            Opt-Out 기능을 설정하더라도 일방형 광고는 전송될 수 있습니다.
            <ol>
              <li>
                마케팅 분석툴 / 광고 플랫폼 사업자
                <br />
                <ul>
                  <li>마케팅 분석툴 : AppsFlyer</li>
                  <li>광고 플랫폼 사업자 : Unity Ads, TapJoy</li>
                </ul>
              </li>
              <li>
                마케팅 정보 수신 차단
                <br />
                <ul>
                  <li>Android : [설정 -&gt; Google &gt; 개인정보 보호 &gt; 마케팅 정보 수신] 선택 해제</li>
                </ul>
              </li>
              <li>
                개인 맞춤형 광고 차단
                <br />
                <ul>
                  <li>
                    Android : [설정 -&gt; Google &gt; 광고] 또는 [설정 -&gt; Google &gt; 개인정보 보호 &gt; 광고] 에서
                    “광고 개인 최적화 선택 해제” 선택
                  </li>
                  <li>iOS : [설정 -&gt; 개인정보 보호 -&gt; Apple 광고]에서 “맞춤형 광고” 선택 해제</li>
                </ul>
              </li>
              <li>
                마케팅 분석툴 / 광고 플랫폼 사업자 Opt-Out 기능 활용
                <br />
                <ul>
                  <li>
                    AppsFlyer :{' '}
                    <Link href='https://www.appsflyer.com/optout' isExternal>
                      https://www.appsflyer.com/optout
                    </Link>
                  </li>
                  <li>
                    Unity Ads :{' '}
                    <Link href='https://unity3d.com/legal/privacy-policy' isExternal>
                      https://unity3d.com/legal/privacy-policy
                    </Link>
                  </li>
                  <li>
                    TapJoy :{' '}
                    <Link
                      href='https://www.tapjoy.com/legal-prior/opt-out-of-tapjoy-interest-based-advertising/'
                      isExternal
                    >
                      https://www.tapjoy.com/legal-prior/opt-out-of-tapjoy-interest-based-advertising/
                    </Link>
                  </li>
                </ul>
              </li>
            </ol>
          </li>
          <li>
            분석 소프트웨어는 이용자가 웹 사이트를 방문하거나 모바일 서비스를 이용할 때 자동으로 생성되는 정보를
            분석하기 위해 사용되며, 이용자는 이를 거부할 수 있습니다.
            <br />
            <ul>
              <li>
                Android : [설정 -&gt; 인터넷 설정 &gt; 개인정보 보호 및 보안] 에서 “스마트 추적 방지” 또는 “사이트에서
                추적하지 못하도록 요청” 선택
              </li>
              <li>iOS : [설정 -&gt;개인정보 보호 &gt; 추적]에서 “앱이 추척을 요청하도록 허용” 선택 해제</li>
              <li>
                Internet Explorer : 웹 브라우저 상단의 “도구” 메뉴 &gt; “안전” 메뉴 &gt; “Do Not Track 요청 켜기” 선택
              </li>
              <li>
                Chrome : [설정 -&gt; 개인정보 및 보안 &gt; 쿠키 및 기타 사이트 데이터 &gt; 일반 설정]에서 탐색 트래픽과
                함께 &apos;추적 안함&apos; 요청 선택
              </li>
            </ul>
          </li>
        </ol>
        <h2>개인정보 보호책임자</h2>
        <p>
          ① 회사는 개인정보 처리에 관한 업무를 총괄하고 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여
          아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
        </p>
        <TableContainer whiteSpace='initial'>
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>소속</th>
                <th>직위</th>
                <th>연락처</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>이승홍</td>
                <td>-</td>
                <td>CPO</td>
                <td>02-556-6780</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
        <p>
          ② 이용자께서는 회사의 서비스를 이용하시면서 발생한 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한
          사항에 대하여 개인정보 보호책임자에게 문의하실 수 있으며, 문의하신 내용은 빠른 시일 내에 답변 및 처리해드릴
          예정입니다. 다만, 부득이한 사유로 지연이 될 경우 이용자께 다시 안내 드리겠습니다.
        </p>
        <h2>권익침해 구제방법</h2>
        <p>이용자는 개인정보 침해에 대한 피해구제나 상담 등이 필요하신 경우에 아래의 기관에 문의하실 수 있습니다.</p>
        <TableContainer whiteSpace='initial'>
          <table>
            <thead>
              <tr>
                <th>기관명</th>
                <th>홈페이지</th>
                <th>전화</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>개인정보 침해신고센터</td>
                <td>
                  <Link isExternal href='https://privacy.kisa.or.kr/'>
                    privacy.kisa.or.kr
                  </Link>
                </td>
                <td>(국번없이) 118</td>
              </tr>
              <tr>
                <td>개인정보 분쟁조정위원회</td>
                <td>
                  <Link isExternal href='https://www.kopico.go.kr/'>
                    www.kopico.go.kr
                  </Link>
                </td>
                <td>(국번없이) 1833-6972</td>
              </tr>
              <tr>
                <td>대검찰청 사이버수사과</td>
                <td>
                  <Link isExternal href='https://cybercid.spo.go.kr/'>
                    cybercid.spo.go.kr
                  </Link>
                </td>
                <td>(국번없이) 1301</td>
              </tr>
              <tr>
                <td>경찰청 사이버안전국</td>
                <td>
                  <Link isExternal href='https://cyberbureau.police.go.kr/'>
                    cyberbureau.police.go.kr
                  </Link>
                </td>
                <td>(국번없이) 182</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
        <h2>본 개인정보처리방침의 적용 범위</h2>
        <p>
          ① 본 개인정보처리방침은 회사가 제공하는 모든 서비스(웹사이트 및 APP 포함)에 적용되지만, 서비스의 특성이 상이한
          경우, 서비스별로 특화된 개인정보처리방침이 적용될 수 있습니다.
        </p>
        <p>
          ② 회사 서비스에 링크되어 있는 다른 회사의 웹사이트를 방문하거나, 방문하신 웹사이트에서 개인정보를 수집하는
          경우 본 개인정보처리방침이 적용되지 않습니다.
        </p>
        <h2>개인정보 처리방침의 변경 및 고지</h2>
        <p>
          ① 본 개인정보처리방침의 내용 추가, 삭제 및 수정이 있을 경우 개정 최소 7일 전에 ‘공지사항’을 통해 사전 공지를
          하겠습니다. 다만, 수집하는 개인정보의 항목, 이용목적의 변경 등과 같이 이용자 권리의 중대한 변경이 발생할 경우
          이용자 동의를 다시 받을 수도 있습니다
        </p>
        <p>② 이 개인정보처리방침은 2022. 7. 01부터 적용됩니다.</p>
      </Container>
    </>
  );
}
