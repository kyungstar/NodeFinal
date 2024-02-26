import express from "express";
import {AddressInfo} from "net";
import formData from "express-form-data";
import Config from "../config";

const app = express();

console.log(JSON.stringify(Config) + " Test");

// JSON 파싱 미들웨어를 사용하고, 요청 본문의 크기를 제한합니다.
app.use(express.json({limit: '50mb'}));

//파일 업로드를 위해 요청 본문을 파싱하는 미들웨어를 등록하고, 설정을 지정합니다.
app.use(formData.parse({
    autoClean: true, // 요청이 완료된 후 임시 파일을 자동으로 삭제
    maxFilesSize: 1024 * 1024 * 1024, // 전송되는 파일의 최대 크기를 설정
}));

// 미들웨어와 함께 사용되며, 다중 파일 업로드를 지원하기 위해 사용됩니다. 이 미들웨어는 파싱된 파일들을 하나의 객체로 병합하여 req.body에 저장합니다.
app.use(formData.union());

app.get('/', (req, res) => res.status(200).end());
app.head('/', (req, res) => res.status(200).end());



