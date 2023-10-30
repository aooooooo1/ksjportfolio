import { Link } from 'react-router-dom/cjs/react-router-dom';
import '../css/Board.css';
import Table from '@mui/joy/Table';
import PostAddIcon from '@mui/icons-material/PostAdd';
import InputForm from "../components/InputForm";

const BoardPage = () => {
  return (
    <div className="container chargeMain">
      <h1 className="textA fontW5">게시판</h1>
      <div className="py-3 d-flex justify-content-between">
          <InputForm/>
          <Link to="/board/create" className="postAdd">
              <PostAddIcon fontSize="large" style={{fontSize:"35px"}}/>
          </Link>
      </div>
      <Table aria-label="basic table" style={{fontSize:"16px"}}>
        <thead>
          <tr>
            <th style={{ width: '10%' }}>번호</th>
            <th>제목</th>
            <th>날짜</th>
            <th>Protein&nbsp;(g)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Frozen yoghurt</td>
            <td>159</td>
            <td>6</td>
            <td>24</td>
          </tr>
          <tr>
            <td>Ice cream sandwich</td>
            <td>237</td>
            <td>9</td>
            <td>37</td>
          </tr>
          <tr>
            <td>Eclair</td>
            <td>262</td>
            <td>16</td>
            <td>24</td>
          </tr>
          <tr>
            <td>Cupcake</td>
            <td>305</td>
            <td>3.7</td>
            <td>67</td>
          </tr>
          <tr>
            <td>Gingerbread</td>
            <td>356</td>
            <td>16</td>
            <td>49</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default BoardPage
