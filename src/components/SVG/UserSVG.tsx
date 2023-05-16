interface Props {
  active: boolean;
}

const UserSVG = ({ active }: Props) => {
  if (active) {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.4275 9.82526C22.4275 13.1924 19.5844 15.9845 15.9989 15.9845C12.4134 15.9845 9.57031 13.1924 9.57031 9.82526C9.57031 6.45809 12.4134 3.66602 15.9989 3.66602C19.5844 3.66602 22.4275 6.45809 22.4275 9.82526Z"
          fill="#484848"
          stroke="#484848"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <mask id="path-2-inside-1_925_9721" fill="white">
          <path d="M4 27.9986C4 22.4915 8.57143 16.9844 16 16.9844C23.4286 16.9844 28 22.4915 28 27.9986" />
        </mask>
        <path
          d="M4 27.9986C4 22.4915 8.57143 16.9844 16 16.9844C23.4286 16.9844 28 22.4915 28 27.9986"
          fill="#484848"
        />
        <path
          d="M2 27.9986C2 29.1032 2.89543 29.9986 4 29.9986C5.10457 29.9986 6 29.1032 6 27.9986H2ZM26 27.9986C26 29.1032 26.8954 29.9986 28 29.9986C29.1046 29.9986 30 29.1032 30 27.9986H26ZM6 27.9986C6 23.6018 9.67028 18.9844 16 18.9844V14.9844C7.47257 14.9844 2 21.3812 2 27.9986H6ZM16 18.9844C22.3297 18.9844 26 23.6018 26 27.9986H30C30 21.3812 24.5274 14.9844 16 14.9844V18.9844Z"
          fill="#484848"
          mask="url(#path-2-inside-1_925_9721)"
        />
      </svg>
    );
  }

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.9275 9.82526C21.9275 12.899 19.3258 15.4845 15.9989 15.4845C12.6719 15.4845 10.0703 12.899 10.0703 9.82526C10.0703 6.75147 12.6719 4.16602 15.9989 4.16602C19.3258 4.16602 21.9275 6.75147 21.9275 9.82526Z"
        stroke="#484848"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask id="path-2-inside-1_741_8478" fill="white">
        <path d="M4 27.9986C4 22.4915 8.57143 16.9844 16 16.9844C23.4286 16.9844 28 22.4915 28 27.9986" />
      </mask>
      <path
        d="M1 27.9986C1 29.6554 2.34315 30.9986 4 30.9986C5.65685 30.9986 7 29.6554 7 27.9986H1ZM25 27.9986C25 29.6554 26.3431 30.9986 28 30.9986C29.6569 30.9986 31 29.6554 31 27.9986H25ZM7 27.9986C7 24.1569 10.2197 19.9844 16 19.9844V13.9844C6.92315 13.9844 1 20.8261 1 27.9986H7ZM16 19.9844C21.7803 19.9844 25 24.1569 25 27.9986H31C31 20.8261 25.0769 13.9844 16 13.9844V19.9844Z"
        fill="#484848"
        mask="url(#path-2-inside-1_741_8478)"
      />
    </svg>
  );
};
export default UserSVG;
