import { ClipLoader } from "react-spinners"

const Loading = () => {
    const styleObj = {
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        zIndex: "99999999999999999"
    }
  return (
    <div style={styleObj}>
        <ClipLoader/>
    </div>
  )
}
export default Loading