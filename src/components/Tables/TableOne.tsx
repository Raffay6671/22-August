import React, { useState, useEffect } from 'react';
import useFetchVpnUsers from '../../components/useFetchVpnUsers';
import Accordian from '../../components/Accordian';
import { VpnUser } from '../../types/VpnUser';

const TableOne = () => {
  const [vpnData, setVpnData] = useState(null);
  const fakeVpnUsers: VpnUser[] = vpnData;
  const [accordion, setAccordion] = useState<number | null>(null);

  const handleAccordion = (index: number) => {
    setAccordion((prev) => {
      if (prev === index) {
        return null;
      } else {
        return index;
      }
    });
  };

  // let all_data;
  useEffect(() => {
    const fetchData = async () => {
      const data = await useFetchVpnUsers();
      if (data) {
        setVpnData(data);
      }
    };

    fetchData();
  }, []);

  // console.log('af', activeUsers);
  const totalUserPerServer = (server) => {
    let activeUsers = 0;
    server.list.forEach((user) => {
      const activeUserCount =
        (user.latest_stat && Number(user.latest_stat.no_of_active_users)) || 0;
      activeUsers += activeUserCount;
    });
    console.log(`Active Users for ${server.cname}:`, activeUsers);
    return activeUsers;
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          VPN
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Country Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Total Servers
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Users
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Lists
              </h5>
            </div>
            <div className="p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                View Lists
              </h5>
            </div>
          </div>

          {vpnData?.servers.map((server) =>
            server.list.map((user, key) => (
              <div
                className={`grid grid-cols-3 sm:grid-cols-8 ${
                  key === server.list.length - 1
                    ? ''
                    : 'border-b border-stroke dark:border-strokedark'
                }`}
                key={user.id}
              >
                {key === 0 && ( // Only render the country name for the first user in each server's list
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-meta-3 ">{user.country}</p>
                  </div>
                )}
                {vpnData?.servers?.map((server) => {
                  const totalServers = server.list.length;
                  console.log(
                    `The total servers of ${server.cname}`,
                    totalServers,
                  );
                })}

                {key === 0 && ( // Only render the country name for the first user in each server's list
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-meta-3 ">{server.list.length}</p>
                  </div>
                )}
                {key === 0 && ( // Only render the country name for the first user in each server's list
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-meta-3 ">
                      {totalUserPerServer(server) ?? 'NAN'}
                    </p>
                    {/* <p className="text-meta-3 ">{totalUserPerServer(server)}</p> */}
                  </div>
                )}

                {key === 0 && ( // Only render the country name for the first user in each server's list
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-meta-3 ">NAN</p>
                  </div>
                )}
                {key === 0 && (
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <Accordian
                      setAccordion={setAccordion}
                      index={key}
                      vpnData={vpnData}
                      handleAccordion={handleAccordion}
                      accordion={accordion === key}
                      fakeVpnUsers={server.list} // Pass the correct data here
                    />
                  </div>
                )}
              </div>
            )),
          )}
        </div>
      </div>
    </>
  );
};

export default TableOne;
