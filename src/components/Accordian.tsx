import React, { useState } from 'react';
import '../css/Accordian.css';

interface AccordionProps {
  id: number;
  handleAccordion: (index: number) => void;
  accordion: boolean;
  index: number;
  fakeVpnUsers: {
    id: number;
    username: string;
    email: string;
    connectionStatus: string;
    ipAddress: string;
    country: string;
    city: string;
    bytesIn: number;
  }[];
}
const Accordion: React.FC<AccordionProps> = ({
  index,
  accordion,
  fakeVpnUsers,
  handleAccordion,
}) => {
  const [isActive, setIsActive] = useState(false);

  const clickHandle = () => {
    setIsActive(!isActive);
    handleAccordion(index);

    console.log('Index Value received by child : ', index);
  };

  return (
    <div className="accordion">
      <div className="accordion-item">
        <div
          className="accordion-title flex justify-between items-center cursor-pointer"
          onClick={clickHandle}
        >
          <div>View List</div>
          <div>{isActive ? '-' : '+'}</div>
        </div>

        {accordion && (
          <div className="accordion-content rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex flex-col">
              <div className="grid grid-cols-5 gap-4 rounded-sm bg-gray-200 dark:bg-meta-4 sm:grid-cols-5">
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase sm:text-base">
                    Country
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase sm:text-base">
                    UID
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase sm:text-base">
                    City
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase sm:text-base">
                    IP Address
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase sm:text-base">
                    Bytes In
                  </h5>
                </div>
              </div>

              {/* Data Input starts from here  */}
              {fakeVpnUsers.map((user) => (
                <div className="grid grid-cols-5 gap-4 mt-4" key={user.id}>
                  <div className="p-2.5 text-center xl:p-5">
                    <p className="text-meta-3 text-lg">{user.country}</p>
                  </div>
                  <div className="p-2.5 text-center xl:p-5">
                    <p className="text-meta-3 text-lg">{user.id}</p>
                  </div>
                  <div className="p-2.5 text-center xl:p-5">
                    <p className="text-meta-3 text-lg">{user.city}</p>
                  </div>
                  <div className="p-2.5 text-center xl:p-5">
                    <p className="text-meta-3 text-lg">{user.ipAddress}</p>
                  </div>
                  <div className="p-2.5 text-center xl:p-5">
                    <p className="text-meta-3 text-lg">{user.bytesIn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
