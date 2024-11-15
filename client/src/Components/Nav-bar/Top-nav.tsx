import { scrollToTop } from "../../Lib/Utils";
import {
  AUTHPAGE,
  EMAIL,
  FACEBOOK,
  HOMEPAGEURL,
  IMAGE_URL,
  INSTERGRAM,
  WHATSAPP,
} from "../../../src/Constant";
import {
  FacebookFilled,
  InstagramFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import { AtSign, LogIn } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const TopNav = () => {
  const SocialMeadia = () => {
    return (
      <>
        <Tooltip placement="bottom" title={"Visit Our Facebook Prifile"}>
          <Link to={FACEBOOK} target="_blank" className="mx-2">
            <FacebookFilled className="text-blue-700 text-2xl	" />
          </Link>
        </Tooltip>

        <Tooltip placement="bottom" title={"Follow Us On Instagram"}>
          <Link to={INSTERGRAM} target="_blank" className="mx-2">
            <InstagramFilled className="text-2xl" />
          </Link>
        </Tooltip>
      </>
    );
  };

  return (
    <>
      <div className="w-full bg-gray-200 py-4">
        <div className="row flex flex-col md:flex-row justify-around col-span-2 items-center">
          <div className="col-span-1 mt-1">
            <ul className="flex justify-between items-center pb-0 mb-0">
              <li className="mx-3 flex font-bold">
                <Tooltip placement="bottom" title={"Home Page"}>
                  <Link to={HOMEPAGEURL}>
                    <Avatar
                      src={`${IMAGE_URL}/logo.jpg`}
                      size={35}
                      className="hover:cursor-pointer"
                    />
                  </Link>
                </Tooltip>
              </li>
              <li className="mx-3 flex font-bold">
                <Tooltip placement="bottom" title={"Contact us via whatsapp"}>
                  <WhatsAppOutlined className="text-green-500 w-4" />
                  <span className="ms-1 text-sm">{WHATSAPP}</span>
                </Tooltip>
              </li>
              <li className="mx-3 ">
                <Tooltip placement="bottom" title={"Contact us via Email"}>
                  <div className="flex items-center font-bold">
                    <AtSign className="text-red-500 w-4" />
                    <a className="ms-1 text-sm" href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                  </div>
                </Tooltip>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex justify-between ">
            <SocialMeadia />
          </div>

          <div className="flex justify-around items-center mt-3 pb-0 md:mt-0">
            <div className="flex md:hidden justify-between ">
              <SocialMeadia />
            </div>

            <div>
              <Link
                to={AUTHPAGE}
                onClick={scrollToTop}
                className="flex items-center font-bold"
              >
                Sign In <LogIn className="mx-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
