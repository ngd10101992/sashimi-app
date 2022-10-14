import { useEffect, useState } from "react"
import { useForm, usePage } from "@inertiajs/inertia-react"
import { UserType, ContactCodeType } from "../../common/type"
import PrimaryButton from "../../Components/PrimaryButton"

declare var route: (string?: string) => any;

interface Props {
    user: UserType
    contactCodes: ContactCodeType | null
}

export default function User({ user, contactCodes }: Props) {
    const [userInfo, setUserInfo] = useState<UserType>(user)
    const { data, setData, post, processing, errors, reset } = useForm({
      targetId: user.id,
    });

    useEffect(() => {
      // console.log(user)
    }, []);

    const submitAdd = (e: React.SyntheticEvent) => {
      e.preventDefault();
      post(route("add-friend"), {
        preserveScroll: true,
        onSuccess: ({ props }) => {
          const { success, error }: any = props.flash
          if (success) {
            setUserInfo(success.user)
            // SetAlert({
            //   message: success.message,
            //   type: 'success'
            // })
          } else {
            // SetAlert({
            //   message: error.message,
            //   type: 'error'
            // })
          }
        }
      })
    }

    const submitConfirm = (e: React.SyntheticEvent) => {
      e.preventDefault();
      post(route("add-friend"), {
        preserveScroll: true,
        onSuccess: ({ props }) => {
          const { success, error }: any = props.flash
          // if (success) {
          //   SetAlert({
          //     message: success.message,
          //     type: 'success'
          //   })
          // } else {
          //   SetAlert({
          //     message: error.message,
          //     type: 'error'
          //   })
          // }
        },
      });
    };

    return (
      <li className="flex py-4 first:pt-0 last:pb-0">
        <img className="h-10 w-10 rounded-full" src={userInfo.avatar} alt={userInfo.name} />
        <div className="ml-3 overflow-hidden">
          <p className="text-sm font-medium text-slate-900 dark:text-white">{userInfo.name}</p>
          <p className="text-sm text-slate-500 truncate">{userInfo.email}</p>
        </div>
        <div className='flex flex-1 justify-end'>
          {(contactCodes && userInfo.isFriend === contactCodes.notRelation) &&
            <form onSubmit={submitAdd}>
              <button
                type="submit"
                className={`inline-flex items-center px-4 py-2
                  border rounded-md font-semibold text-sky-500
                  text-xs tracking-widest border-sky-500
                  transition ease-in-out duration-150
                  ${processing && "opacity-25"}`
                }
                disabled={processing}
              >
                Add
              </button>
            </form>
          }
          {(contactCodes && userInfo.isFriend === contactCodes.pending) &&
            <span className={
                `inline-flex items-center px-4 py-2 bg-amber-300
                border border-transparent rounded-md font-semibold
                text-xs text-white tracking-widest
                transition ease-in-out duration-150`
              }
            >
              Pending...
            </span>
          }
          {(contactCodes && userInfo.isFriend === contactCodes.confirm) &&
            <form onSubmit={submitConfirm}>
              <PrimaryButton processing={processing}>Confirm</PrimaryButton>
            </form>
          }
          {(contactCodes && userInfo.isFriend === contactCodes.isFriend) &&
            <span className={
                `inline-flex items-center px-4 py-2 bg-emerald-400
                border border-transparent rounded-md font-semibold
                text-xs text-white tracking-widest
                transition ease-in-out duration-150`
              }
            >
              My friend
            </span>
          }
        </div>
      </li>
    )
}
