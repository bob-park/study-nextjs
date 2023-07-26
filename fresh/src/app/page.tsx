export default function Home() {
  let name = 'bob park';
  let age = 20;
  let link = 'http://google.com';

  return (
    // 반드시 return(..) 안에 HTML 넣어야함
    // 반드시 하나의 HTML tag 로 시작해서 하나의 HTML tag 로 끝나야함
    // 난 tailwind 로 한다.
    <div>
      <h4 className="font-bold text-center mt-10">애플후레시 {age}</h4>
      {/* data binding */}
      <p className="text-center">by {name}</p>

      {/* return(..) 안에 js 사용하기 */}
      <a href={link}>링끄</a>

      {/* css 까지 귀찮을 때 style 쓰기 */}
      {/* 주의 style 을 js 객체로 만들어져있기 때문에 케밥케이스를 사용할 수 없다. */}
      <h4 style={{ color: 'red', fontSize: '30px' }}> 이게 말이 되냐?</h4>
    </div>
  );
}
