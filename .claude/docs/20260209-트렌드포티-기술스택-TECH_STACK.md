# 트렌드포티 (Trand Forty) - 기술스택 결정

> **작성일:** 2026-02-09

---

## 1. 기술스택 요약

| 영역 | 선택 | 근거 |
|------|------|------|
| **언어** | Python 3.11+ | 데이터 처리, API 연동, AI 통합에 최적. 관련 라이브러리 생태계 풍부 |
| **패키지 관리** | uv | pip 대비 10~100배 빠른 설치 속도, lockfile 지원 |
| **네이버 API** | requests 직접 호출 | PyNaver 대비 의존성 최소화, API 구조가 단순 |
| **구글 트렌드** | trendspyg | pytrends가 2025.04 archived됨. 현재 유일한 활발 유지보수 대안 |
| **AI 글 생성** | Anthropic Claude API | 한국어 품질 우수, 긴 글 생성에 강점 |
| **워드프레스** | requests + Application Passwords | 별도 라이브러리 불필요, WP REST API가 충분히 단순 |
| **DB** | SQLite | 서버 불필요, 파일 기반, 일 210건 규모에 충분 |
| **ORM** | 사용 안 함 (sqlite3 표준 라이브러리) | 테이블 3개, 쿼리 단순하여 ORM 오버헤드 불필요 |
| **스케줄러** | system cron (Linux/Mac) 또는 APScheduler | 외부 의존성 최소화. 서버 배포 시 crontab 사용 |
| **설정 관리** | python-dotenv + PyYAML | .env (시크릿), config.yaml (비시크릿 설정) |
| **로깅** | Python logging (표준 라이브러리) | 별도 라이브러리 불필요 |
| **테스트** | pytest + pytest-asyncio | 표준 Python 테스트 프레임워크 |
| **코드 품질** | ruff | linting + formatting 통합, 빠른 속도 |
| **타입 체크** | mypy (선택적) | 주요 모듈에만 적용 |

---

## 2. 핵심 의존성 목록

### 런타임 의존성
```
requests>=2.31.0          # HTTP 클라이언트 (네이버 API, WordPress API)
trendspyg>=0.5.0          # Google Trends 데이터 수집
anthropic>=0.40.0         # Claude API 클라이언트
python-dotenv>=1.0.0      # .env 파일 로드
pyyaml>=6.0               # config.yaml 파서
```

### 개발 의존성
```
pytest>=8.0               # 테스트 프레임워크
pytest-asyncio>=0.23      # 비동기 테스트 지원
ruff>=0.8.0               # 린터 + 포매터
mypy>=1.11                # 타입 체커 (선택)
```

---

## 3. 기술 선택 상세 근거

### 3.1 Python 선택 이유
- 네이버/구글 트렌드 관련 라이브러리가 모두 Python 기반
- Anthropic Claude SDK 공식 지원
- 데이터 수집/가공 작업에 최적화된 생태계
- 스크립트/자동화 특성의 프로젝트에 적합 (웹 서버가 아님)

### 3.2 trendspyg 선택 이유
| 옵션 | 장점 | 단점 | 결론 |
|------|------|------|------|
| **trendspyg** | 무료, 활발 유지보수, Trending Now 지원 | Chrome 필요, Google 봇탐지 위험 | **MVP 채택** |
| SerpApi | 안정적, 구조화된 데이터 | 유료 ($75/월~) | Phase 2 고려 |
| Google Trends API (공식) | 공식 API | 알파 단계, 일 5쿼리 한도 | 비현실적 |

### 3.3 SQLite 선택 이유
- 일일 데이터량: 키워드 ~50건 + 글 7건 = 미미한 규모
- 서버 프로세스 불필요, 파일 1개로 관리
- 백업: 파일 복사만으로 완료
- 향후 PostgreSQL 마이그레이션이 필요할 만큼 커질 가능성 낮음

### 3.4 Application Passwords (WordPress 인증)
- WordPress 5.6+ 내장 기능 (플러그인 설치 불필요)
- REST API 전용 비밀번호 (wp-admin 로그인 불가)
- HTTPS 환경에서 안전
- JWT 대비 구현 복잡도 현저히 낮음

---

## 4. 프로젝트 구조

```
trand_forty/
├── pyproject.toml              # 프로젝트 메타데이터 + 의존성 (uv)
├── .env.example                # 환경변수 템플릿
├── config.yaml                 # 카테고리/시드키워드/스케줄 설정
├── src/
│   └── trand_forty/
│       ├── __init__.py
│       ├── main.py             # 엔트리포인트 (CLI)
│       ├── config.py           # 설정 로더 (.env + config.yaml)
│       ├── db.py               # SQLite 스키마 초기화 + CRUD
│       ├── collectors/
│       │   ├── __init__.py
│       │   ├── naver.py        # 네이버 DataLab API 클라이언트
│       │   └── google.py       # Google Trends (trendspyg) 클라이언트
│       ├── analyzer/
│       │   ├── __init__.py
│       │   └── ranker.py       # 키워드 스코어링 + 선정 알고리즘
│       ├── generator/
│       │   ├── __init__.py
│       │   ├── writer.py       # AI 글 생성 (Claude API)
│       │   └── prompts.py      # 프롬프트 템플릿 관리
│       ├── publisher/
│       │   ├── __init__.py
│       │   └── wordpress.py    # WordPress REST API 클라이언트
│       └── scheduler/
│           ├── __init__.py
│           └── cron.py         # 스케줄러 설정 헬퍼
├── tests/
│   ├── conftest.py
│   ├── test_collectors/
│   ├── test_analyzer/
│   ├── test_generator/
│   └── test_publisher/
├── data/
│   └── trand_forty.db          # SQLite DB 파일 (gitignore)
└── logs/                       # 로그 파일 (gitignore)
```

---

## 5. 환경 변수 (.env)

```bash
# 네이버 API
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=

# Anthropic Claude API
ANTHROPIC_API_KEY=

# WordPress
WP_BASE_URL=https://yourblog.com
WP_USERNAME=
WP_APP_PASSWORD=

# 선택: SerpApi (Phase 2)
# SERPAPI_KEY=
```

---

## 6. 실행 환경 요구사항

| 항목 | 최소 요구 |
|------|----------|
| Python | 3.11+ |
| Chrome | trendspyg 실행에 필요 (headless 가능) |
| OS | macOS / Linux / WSL |
| 디스크 | < 100MB (DB + 로그) |
| 메모리 | < 512MB |
| 네트워크 | HTTPS 아웃바운드 (Naver, Google, WordPress, Anthropic) |
