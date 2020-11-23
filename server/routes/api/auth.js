// 회원 인증 관련 라우터
import express from "express";
import jwt from "jsonwebtoken"; // token을 이용한 회원 인증 사용을 위해 jwt 라이브러리 사용
import auth from "../../middleware/auth"; // 인증 관련 미들웨어
import config from "../../config/index";
const { JWT_SECRET } = config;

// Model
import User from "../../models/user";

const router = express.Router();


// 로그인
router.post("/", (req, res) => {
    const { account, password } = req.body;

  // 빈칸 입력 확인
    if (!account || !password) {
    return res.status(400).json({ msg: "빈칸을 모두 채워주세요." });
    }

  // 유저 정보 검사
    User.findOne({ account }).then((user) => {

    // 계정 존재 여부 확인
    if (!user)
    return res.status(400).json({ msg: "사용자가 존재하지 않습니다." });

    // 비밀번호 일치 여부 확인
    if(password === user.password) {
        jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: "30 m" }, // 유효 시간
            (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        account: user.account,
                        name: user.name,
                        branch_office: user.branch_office,
                        role: user.role,
                        admission: user.admission,
                    }
                })
            }
        )
    } else {
        return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." }); // 미일치 시 반환
    }
    });
});

router.post("/logout", (req, res) => {
  res.json("로그아웃 성공");
  // 로그아웃은 front end 파트에서 적용
});

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // 요청받은 id를 User model 에 검색
    if (!user) throw Error("유저가 존재하지 않습니다.");
    res.json(user); // user 반환
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

export default router;
