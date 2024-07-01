type Props = {
    number:number
}
const NotificationBullet = (props:Props) =>{
    return (<div className="grid ml-auto place-items-center justify-self-end">
            <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-full select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
              <span className="">{props.number}</span>
            </div>
          </div>)
}
export default NotificationBullet;