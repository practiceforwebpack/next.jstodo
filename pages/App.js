import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Encodeurl from "../components/Encodeurl"; // 导入你的 EncodeUrl 组件

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Encodeurl" component={Encodeurl} />
        {/* 添加其他路由 */}
      </Switch>
    </Router>
  );
}

export default App;
