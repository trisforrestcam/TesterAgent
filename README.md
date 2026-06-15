# Tester

Tester cho [Opencode](https://opencode.ai) SDK với nhiều provider LLM.

## Cài đặt

```bash
cp .env.example .env
npm install
```

## Cấu hình

Chỉnh sửa `.env`:

| Biến | Mô tả | Mặc định |
|------|-------|----------|
| `PROVIDER` | Provider cần dùng: `kimi` hoặc `xiaomi` | `kimi` |
| `KIMI_API_KEY` | API key Moonshot AI | - |
| `KIMI_BASE_URL` | Base URL Kimi | `https://api.kimi.com/coding/v1` |
| `KIMI_MODEL` | Model name | `kimi-k2.6` |
| `XIAOMI_API_KEY` | API key Xiaomi | - |
| `XIAOMI_BASE_URL` | Base URL Xiaomi | `https://token-plan-sgp.xiaomimimo.com/v1` |
| `XIAOMI_MODEL` | Model name | `mimo-v2.5` |

## Chạy

```bash
npm start
```

## Thêm provider mới

1. Tạo class mới trong `provider.impl.ts`, kế thừa `BaseProvider`
2. Đăng ký trong `provider/index.ts` (map `ProviderType` → factory function)
3. Thêm env vars vào `.env.example` và `.env`
