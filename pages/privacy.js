import { Link, Box, Container, Heading, TableContainer } from '@chakra-ui/react';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';

export default function privacy({ text }) {
  return (
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
      <Head>
        <title>시그니스 FR 개인정보 처리방침</title>
      </Head>
      <Heading as='h1' textAlign='center' fontSize='4xl'>
        시그니스 FR 개인정보 처리방침
      </Heading>
      <ReactMarkdown className='markdown'>{text.a1}</ReactMarkdown>
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
      {/* Article 3 */}
      <h2>개인정보의 제3자 제공</h2>
      <p>
        ① 회사는 이용자의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의,
        법률의 특별한 규정 등 ｢개인정보 보호법｣ 제17 조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
      </p>
      <p>② 회사는 제3자에게 개인정보를 제공하지 않으며, 제공하게 될 경우 이용자에게 동의를 받겠습니다.</p>

      {/* Article 4 */}

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
          <tbody style={{ color: 'blue' }}>
            <tr>
              <td>㈜케이에스넷</td>
              <td>전자상거래 결제서비스 제공</td>
              <td>서비스 이용 종료 또는 위탁계약 종료 시까지</td>
            </tr>
            <tr>
              <td>우체국</td>
              <td>이벤트 상품 배송</td>
              <td>서비스 이용 종료 또는 위탁계약 종료 시까지</td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
      <p>
        ③ 회사는 위탁계약 체결 시 ｢개인정보 보호법｣ 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적 ·
        관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고,
        수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
      </p>
      <p>
        ④ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
      </p>
      <ReactMarkdown className='markdown'>{text.a5}</ReactMarkdown>

      {/* Article 6 */}
      <h2>처리하는 개인정보 항목</h2>
      <p>① 회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
      <TableContainer whiteSpace='initial'>
        <table>
          <thead>
            <tr>
              <th>구분</th>
              <th>수집·이용목적</th>
              <th>필수/선택</th>
              <th colSpan='2'>수집 및 이용항목</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan='4'>로그인</td>
              <td rowSpan='4'>
                회원가입 및 로그인
                <br />
                (SNS 연동)
              </td>
              <td rowSpan='4'>필수/선택</td>
              <td>이메일(ID)</td>
              <td>(필수) 이메일, 이름</td>
            </tr>
            <tr>
              <td>Facebook</td>
              <td>(필수) ID, 이메일, 시그니스 FR ID</td>
            </tr>
            <tr>
              <td>Google</td>
              <td>(필수) ID, 이름, 성별, 시그니스 FR ID</td>
            </tr>
            <tr>
              <td>Apple</td>
              <td>(필수) ID, 이름, 이메일, 시그니스 FR ID</td>
            </tr>
            <tr>
              <td>결제서비스</td>
              <td>결제서비스 이용</td>
              <td rowSpan='2'>선택</td>
              <td colSpan='2'>신용카드 결제정보</td>
            </tr>
            <tr>
              <td rowSpan={6}>문의하기</td>
              <td rowSpan={6}>이용자 문의 및 고충 처리</td>
              <td colSpan={2}>이메일 (공통)</td>
            </tr>
            <tr>
              <td rowSpan={6}>필수</td>
              <td>계정 관련</td>
              <td rowSpan={2}>시그니스 FR ID</td>
            </tr>
            <tr>
              <td>결제 관련</td>
            </tr>
            <tr>
              <td>환불 관련</td>
              <td>시그니스 FR ID, 이름, 연락처(메일주소, 휴대전화번호)</td>
            </tr>
            <tr>
              <td>미성년자 결제 환불 요청</td>
              <td>시그니스 FR ID, 법정대리인의 결제정보(이름, 생년월일), 주소, 우편번호, 가족 관계</td>
            </tr>
            <tr>
              <td>기타</td>
              <td>시그니스 FR ID, 이름, 연락처(메일주소, 휴대전화번호)</td>
            </tr>
            <tr>
              <td>기타서비스</td>
              <td>이벤트 안내</td>
              <td>상품 배송</td>
              <td>이름, 주소, 휴대전화번호, 우편번호</td>
            </tr>
          </tbody>
        </table>
        <p>② 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.</p>
        <p>IP주소, 쿠키, 서비스 이용기록,</p>
        <p>③ 서비스 이용과정에서 개인정보는 아니지만 아래의 정보가 생성되어 수집될 수 있습니다.</p>
        <p>
          광고식별자, 방문기록, 기기 정보(유형, 모델명, OS 버전, APP 버전, 기기 식별자, 언어 및 국가), 캐릭터
          이름/성별/국가/프로필 사진, 서포트코드
        </p>
        <p>
          ④ 회사의 서비스를 이용하여 캐릭터 및 관련 콘텐츠를 생성할 경우, 이용자의 카메라 기능을 이용하지만 이용자의
          사진을 복사하거나 회사의 서버로 전송하지 않습니다.
        </p>
      </TableContainer>
      <ReactMarkdown className='markdown'>{text.a7}</ReactMarkdown>

      {/* Article 10 */}
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
              <td>김영군</td>
              <td>GG56 Korea</td>
              <td>대표</td>
              <td>02-556-6780</td>
            </tr>
            <tr>
              <td>이승홍</td>
              <td>GG56 Korea 경영지원팀</td>
              <td>이사</td>
              <td>02-556-6780</td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
      <p>
        ② 이용자께서는 회사의 서비스를 이용하시면서 발생한 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항에
        대하여 개인정보 보호책임자에게 문의하실 수 있으며, 문의하신 내용은 빠른 시일 내에 답변 및 처리해드릴 예정입니다.
        다만, 부득이한 사유로 지연이 될 경우 이용자께 다시 안내 드리겠습니다.
      </p>

      {/* Article 11 */}
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
      {/* Article 12 */}
      <h2>본 개인정보처리방침의 적용 범위</h2>
      <p>
        ① 본 개인정보처리방침은 회사가 제공하는 모든 서비스(웹사이트 및 APP 포함)에 적용되지만, 서비스의 특성이 상이한
        경우, 서비스별로 특화된 개인정보처리방침이 적용될 수 있습니다.
      </p>
      <p>
        ② 회사 서비스에 링크되어 있는 다른 회사의 웹사이트를 방문하거나, 방문하신 웹사이트에서 개인정보를 수집하는 경우
        본 개인정보처리방침이 적용되지 않습니다.
      </p>
      {/* Article 13 */}
      <h2>개인정보 처리방침의 변경 및 고지</h2>
      <p>
        ① 본 개인정보처리방침의 내용 추가, 삭제 및 수정이 있을 경우 개정 최소 7일 전에 ‘공지사항’을 통해 사전 공지를
        하겠습니다. 다만, 수집하는 개인정보의 항목, 이용목적의 변경 등과 같이 이용자 권리의 중대한 변경이 발생할 경우
        이용자 동의를 다시 받을 수도 있습니다
      </p>
      <p>② 이 개인정보처리방침은 2022. 7. 01부터 적용됩니다.</p>
    </Container>
  );
}
export async function getStaticProps() {
  const a1 = fs.readFileSync(path.join('docs', '08-02-2022', '개인정보 처리방침', 'a1.md'), 'utf-8');
  const a5 = fs.readFileSync(path.join('docs', '08-02-2022', '개인정보 처리방침', 'a5.md'), 'utf-8');
  const a7 = fs.readFileSync(path.join('docs', '08-02-2022', '개인정보 처리방침', 'a7.md'), 'utf-8');

  return { props: { text: { a1, a5, a7 } } };
}
