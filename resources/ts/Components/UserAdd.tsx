import { useEffect, useState } from "react"
import { useForm, usePage } from "@inertiajs/inertia-react"
import { UserType } from "../common/type"

declare var route: (string?: string) => any;

export interface AddUserType extends UserType {
  contact_id: number
}

interface Props {
  info: AddUserType
}

export default function AddUser({ info }: Props) {
    const [userInfo, setUserInfo] = useState<UserType>(info)
    const { data, setData, post, processing, errors, reset } = useForm({
      contact_id: info.contact_id,
    })
    const [status, setStatus] = useState<'pending' | 'refuse' | 'confirm'>('pending')

    const submitConfirm = (e: React.SyntheticEvent) => {
      e.preventDefault();
      post(route("add-friend-confirm"), {
        preserveScroll: true,
        onSuccess: ({ props }) => {
          const { success, error }: any = props.flash
          if (success) {
            setStatus('confirm')
          } else {
            console.log(error)
          }
        },
      });
    };

    const submitRefuse = (e: React.SyntheticEvent) => {
      e.preventDefault();
      post(route("add-friend-refuse"), {
        preserveScroll: true,
        onSuccess: ({ props }) => {
          const { success, error }: any = props.flash
          if (success) {
            setStatus('refuse')
          } else {
            console.log(error)
          }
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
          {
            status === 'refuse' &&
            <span className={`inline-flex items-center px-4 py-2
                border rounded-md font-semibold text-sky-500
                text-xs tracking-widest border-sky-500
                transition ease-in-out duration-150`
              }
            >
              Deleted friend request
            </span>
          }
          {
            status === 'confirm' &&
            <span className={`inline-flex items-center px-4 py-2
                border rounded-md font-semibold text-sky-500
                text-xs tracking-widest border-sky-500
                transition ease-in-out duration-150`
              }
            >
              My friend
            </span>
          }
          {
            status === 'pending' &&
            <>
              <form onSubmit={submitConfirm}>
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
                  Confirm
                </button>
              </form>
              <form onSubmit={submitRefuse}>
                <button
                  type="submit"
                  className={`inline-flex items-center px-4 py-2
                    border rounded-md font-semibold text-red-500
                    text-xs tracking-widest border-red-500
                    transition ease-in-out duration-150
                    ${processing && "opacity-25"}`
                  }
                  disabled={processing}
                >
                  Remove
                </button>
              </form>
            </>
          }
        </div>
      </li>
    )
}
