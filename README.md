# 프로젝트 이름

게시판 프로젝트

# 프로젝트 소개

이 프로젝트는 간단한 게시판 애플리케이션입니다. 사용자는 게시글을 생성하고, 모든 게시글을 조회하며, 특정 게시글을 조회할 수 있습니다. 게시글은 연관 게시글을 가지며, 이는 게시글의 내용이 유사한 다른 게시글을 의미합니다. 게시글 마다 연관 게시글이 있다면 함께 표시가 됩니다.

그리고 MVC 패턴을 사용하였습니다. 이 MVC 패턴을 사용함으로써 가독성을 높였고, 애플리케이션의 각 부분을 독립적으로 개발하고 테스트할 수 있어, 유지보수와 확장성이 용이해졌습니다.

# 설치 및 실행 방법

-이 레포지토리를 클론합니다: git clone https://github.com/GiHwan-Lee/LGH_Board.git

-디렉토리로 이동합니다: cd your-repo-name

-필요한 npm 패키지를 설치합니다: npm install

-.env 파일을 생성하고, 데이터베이스 연결 정보를 입력합니다.

-애플리케이션을 실행합니다: npm start

# 환경 변수

이 프로젝트는 다음 환경 변수를 사용합니다.

DB_HOST: 데이터베이스 호스트

DB_USER: 데이터베이스 사용자 이름

DB_PASSWORD: 데이터베이스 비밀번호

DB_NAME: 데이터베이스 이름

# 구현하고자 했던 기능

-게시글 생성: 사용자는 제목과 본문을 입력하여 게시글을 생성할 수 있습니다.

-게시글 조회: 사용자는 모든 게시글의 목록을 조회하거나, 특정 게시글의 세부 정보를 조회할 수 있습니다.

-연관 게시글: 게시글은 연관 게시글을 가집니다. 이는 게시글의 내용이 유사한 다른 게시글을 의미합니다. 연관 게시글은 여러개가 있을 수 있고, 아예 없을 수도 있습니다. 게시글이 생성되었을 때 연관 게시글이 있다면 연결을 시켜서 게시글 마다 연관 게시글이 함께 노출이 되도록 합니다.

연관 게시글이 되기 위한 조건은 먼저, 문장에서 자주 쓰이는 단어는 배제시키기 위해 전체 게시글 중에 60% 이상 발견되는 단어는 제외시키고, 전체 게시글 중 자주 나타나는 단어의 빈도가 40% 이하이면서 두 단어 이상 동시에 나타나는 경우에만 조건에 충족됩니다.

-연관 게시글 순서: 연관 게시글 조건에 충족하는 게시글들이 여러개 있을 때 연관도가 높을수록 우선적으로 보여지도록 합니다. 이는 연관 게시글 조건에 충족하는 게시글이 있을 때 이들 사이에 40% 이하 빈도로 나타나는 단어가 자주 나타날수록 더 연관이 있는 것으로 판단합니다.

# 구현한 기능

-게시글 생성: 사용자는 제목과 본문을 입력하여 게시글을 생성할 수 있습니다.

-게시글 조회: 사용자는 모든 게시글의 목록을 조회하거나, 특정 게시글의 세부 정보를 조회할 수 있습니다.

-연관 게시글: 연관 게시글이 되기 위한 조건 중에 60% 이상 발견되는 단어는 제외시키도록 하고 있는데 이 부분까지는 구현했으나, 40% 이하인 단어를 찾아서 연관 게시글이 되도록 하는 부분은 구현하지 못했습니다.

-데이터베이스 연결에 필요한 민감한 정보를 보호하고, 어플리케이션 설정을 쉽게 관리하기 위해 환경 변수를 사용했습니다. .env 파일과 config.js 파일을 이용하여 환경 변수를 설정하고 가져오도록 구현했습니다. 그리고 .gitignore을 통해 Git 버전 관리에서 제외하여 데이터베이스 정보가 공개되는 것을 방지했습니다.

# 구현하지 못한 기능

-연관 게시글: 연관 게시글이 되기 위한 조건인 '전체 게시글 중 자주 나타나는 단어의 빈도가 40% 이하이면서 두 단어 이상 동시에 나타나는 경우'를 구현하지 못했습니다.

-연관 게시글 순서: 연관도가 높은 게시글일수록 우선적으로 보여지도록 하는 기능에 대해서는 구현하지 못했습니다.

게시글의 내용이 유사한 다른 게시글, 즉 "연관 게시글"을 찾아 노출시키는 기능은 이 프로젝트의 주요 목표 중 하나였습니다. 이를 위해, 게시글 내의 단어들을 분석하고, 그 빈도와 상관 관계를 이용하여 연관성을 측정하려는 계획을 세웠습니다. 특히, 게시글 전체에서 자주 나타나는 단어는 배제하고, 40% 이하의 빈도로 나타나면서 두 단어 이상 동시에 나타나는 단어들을 기반으로 연관성을 측정하려고 했습니다.

이러한 기능은 자연어 처리와 텍스트 마이닝 기법을 필요로 합니다. 그러나, 이러한 기능을 완전히 구현하는 데에는 더 많은 시간과 리소스가 필요했습니다. 특히, 연관성 측정 알고리즘의 성능 향상과, 연관 게시글의 순서를 결정하는 기능은 추가적인 연구와 개발이 필요하였습니다.

# 사용된 기술

-Node.js

-Express.js

-MySQL

# 프로젝트를 하면서 느낀 점

게시글을 CRUD하는 기능은 구현해본 경험이 있지만, 자연어 처리를 통해 연관 게시글을 찾고 노출시키는 기능은 처음 도전해본 영역이었습니다. 비록 아직 완성시키지는 못 했지만, 이 과정에서 어떤 방향으로 공부를 해나가면 좋을지에 대한 가이드를 얻을 수 있는 귀중한 경험이었습니다.

현재 상태에서는 게시글 생성과 조회, 그리고 자주 나타나는 단어를 제외하는 기능까지만 구현하였습니다. 그러나 프로젝트를 계속 진행하면서 이러한 연관 게시글 기능을 완성하고, 연관 게시글의 순서를 결정하는 기능을 추가하는 것이 목표입니다. 이 프로젝트의 핵심 목표는 사용자에게 가장 관련성이 높은 게시글을 제공하는 것이므로, 이 부분을 완성하는 것이 매우 중요하다는 것을 깨달았습니다.

결과에 상관 없이, 앞으로 구현하고자 했던 모든 기능들을 충족시키는 어플리케이션을 만드는 것이 제 계획입니다. 이 기능은 앞으로의 업데이트에서 반드시 포함될 예정입니다. 그리고 완성시킨 뒤에도 고품질의 어플리케이션으로 만들기 위해 지속적인 리팩토링을 진행할 계획입니다. 이러한 과정을 통해 끊임없이 배우고 성장하는 개발자가 되려고 합니다. 감사합니다.
