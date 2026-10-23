import React, { useState } from 'react';
import { Download } from 'lucide-react';

/**
 * Complete, unmodified base64 string of Koushiga S. Jayandran's resume PDF.
 * Decoded directly in-memory to prevent file system navigation or browser download failures.
 */
const RESUME_PDF_BASE64 =
  'JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYSAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjEgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iagozIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcgL05hbWUgL0YyIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKNCAwIG9iago8PAovQSA8PAovUyAvVVJJIC9UeXBlIC9BY3Rpb24gL1VSSSAoaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2tvdXNoaWdhLXMtamF5YW5kcmFuLTQ1YjY4YTQzMikKPj4gL0JvcmRlciBbIDAgMCAwIF0gL1JlY3QgWyAyMDcuODQ0OCA3NTguMDc4IDI0MS44NjQ4IDc2OC44NzggXSAvU3VidHlwZSAvTGluayAvVHlwZSAvQW5ub3QKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0EgPDwKL1MgL1VSSSAvVHlwZSAvQWN0aW9uIC9VUkkgKGh0dHBzOi8vZ2l0aHViLmNvbS9Lb3VzaGlnYS1TLUpheWFuZHJhbikKPj4gL0JvcmRlciBbIDAgMCAwIF0gL1JlY3QgWyAyNDkuMzcwOCA3NTguMDc4IDM4Ny40MzA4IDc2OC44NzggXSAvU3VidHlwZSAvTGluayAvVHlwZSAvQW5ub3QKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL0EgPDwKL1MgL1VSSSAvVHlwZSAvQWN0aW9uIC9VUkkgKGh0dHBzOi8vdGFtaXpuLXZpc2EuYWkuc3R1ZGlvLykKPj4gL0JvcmRlciBbIDAgMCAwIF0gL1JlY3QgWyAzMjIuOTY4MyAzNDYuOTc4IDQwNC40OTAzIDM1Ny43NzggXSAvU3VidHlwZSAvTGluayAvVHlwZSAvQW5ub3QKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL0Fubm90cyBbIDQgMCBSIDUgMCBSIDYgMCBSIF0gL0NvbnRlbnRzIDExIDAgUiAvTWVkaWFCb3ggWyAwIDAgNTk1LjI3NTYgODQxLjg4OTggXSAvUGFyZW50IDEwIDAgUiAvUmVzb3VyY2VzIDw8Ci9Gb250IDEgMCBSIC9Qcm9jU2V0IFsgL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSSBdCj4+IC9Sb3RhdGUgMCAKICAvVHJhbnMgPDwKCj4+IC9UeXBlIC9QYWdlCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9QYWdlTW9kZSAvVXNlTm9uZSAvUGFnZXMgMTAgMCBSIC9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iago5IDAgb2JqCjw8Ci9BdXRob3IgKEtvdXNoaWdhIFMuIEpheWFuZHJhbikgL0NyZWF0aW9uRGF0ZSAoRDoyMDI2MTAxODE4NTAyMCswMCcwMCcpIC9DcmVhdG9yIChcKHVuc3BlY2lmaWVkXCkpIC9LZXl3b3JkcyAoKSAvTW9kRGF0ZSAoRDoyMDI2MTAxODE4NTAyMCswMCcwMCcpIC9Qcm9kdWNlciAoUmVwb3J0TGFiIFBERiBMaWJyYXJ5IC0gXChvcGVuc291cmNlXCkpIAogIC9TdWJqZWN0IChcKHVuc3BlY2lmaWVkXCkpIC9UaXRsZSAoS291c2hpZ2EgUy4gSmF5YW5kcmFuIFwyMDUgUmVzdW1lKSAvVHJhcHBlZCAvRmFsc2UKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9Db3VudCAxIC9LaWRzIFsgNyAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjExIDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDMxOTUKPj4Kc3RyZWFtCkdhdTBGPkM1J2QnIypoPFIoRllLRS4lcTJbP1QqbzJHKUI1cD1uRFkpZHQ3aWBqWWdAJjUlSE5OWyxdKy0jalEyZy8sJD8pODVYZTsmR3RkTyEwIiIraSksSUkvJU4uQERfWEgkc1UmSEgzcEEyXT4qNUBgQ2UxdC9CPjFNa2s4aTtsTHNeKl1XMFpbZWhUS0g5WihsSXEhLlFYWk89bjcqQnFvTVV1OmkyUFtLKGwtKChpW14xI2BhQ1k5MihUREhxMmBxKztvKCdHcyZIbU5QQHEkRG8nQC86OC5zK0pca0BUO18icloibmAuK0xELGgvUjYnW3JhSDNUayhwPWZ0KFwqOHJkPXBOX2lgK2RoZUhnUU1lKWBST2sqaGo9SGdiTiRrdEE7XEhBOVkpL2RnYl1MSTk/WWlKMVs5ciVQcmo8IjwkVCpwIkM1bSQlRk1sTENdLWhlU1tkRV1FXWlYUnJFTkdqVmFlRi5JTnRrbnFsKTVsLEFQWUYsXzZSVzkoVE1tM2MtaSMlJVRpbl5bLzleazxqQjRoLV1NLGhgXDgpWUtkQm5dXCkwRTIwMVZpRzpXW104XCEjRXUnZV09WVc6OE9wbWlxUlwmRjtTYWg4Ty5qIj5HLG5uVG10blgqRDlTNWVaZCNdLVZQTjtzZ1VDUEA4LlEoTCFHNlAlTDdCLG1kZ2o7c0dyQzMjVFE2MjMnSCc4NFo1S2ZicFNnbWFFUzoncSxBbkJUJzc4LEc7ZV1SUDVZKidOYkpnM1g7OUBkIicuW1kmL2cjVCRuc10/Q25COyU8clA+YCo5TydRNFVKK1BUJGY/IUhHdSs7KGtSIihyLi5gMVttQGYyOXA0VEo2WUwrMk5WPDhlZ1tEWmhNWl8pXGNOcW40TlsvTUFXM0xKblBUQW5mOSJqcStAcnAnbUgrJzwpaD5ZWixLJUBiQlFPWD41Q09VXlZyT0JZYVB1cCk+NSosTEVPWWAjTz1ZWDtJQClRUVptRTpwQmJPVCMzTlBjOThhUSZpN3NlbWNjcUQqKSRyK0UrQEUiSC0yVUY6WCpbPHRUN188NmtaVyZcKD4+a0JjOmtGYE4kYzQqcDRhbi9dMFROcEw2LUhWRWosLFJFS2dPOlohbmxPNitiOE1SYC5QLDpCc14uSid0VlwzKEFLPGVgY0I+U0FMSFVqUlNbOCc6LDxnSjJPNVUlQ3M4ISMmNXNWVDwlUDA0PTNCREgoZDFPOmRpQDF1VWxiKDc6O05ca0o0ZWdST2o+Rik8KzYjRCQkb0xkbk5WKVg4dUZzUGtbXCtYKFlhSlYyI2dpczpQREdBUC4rW2hYSnFdcFtHXmpJcG5gMTFaNmJQQ1otbzxbYVFWLmRvP2BnWicmNUVkJC1SY1FSQ1QxdFpaXzZnVkMmV1BhVmB0Wy5Yc1YoNF9SUXEiS2RuP2RyVktrN0NzPV80cmFyMDEpWXNuKWs0YUAmYSYpZlFqTTwjTVw7Lkk3YVxyYUo3VGVLJjVqUTNkJWdbUFZJJl1eaSxvOjJbVz1GLShCTzghNV90ZXNUVmhUTyUoRWAhMmc7QyYtdSJCKVFKUEZtO1FmZHNkOCNjRzYxNUcpLmU1c0pJMldmODAyIjRSWSQ0YiFMajokbGAxYjMxRC4uUFlsLzBDcEZTdSpLTSxbUkJTTSNAUEcvKT5hRGA7WCdAPGleUUJQTm9aLlhfWVZOL0JrSE4zSl8hXzxMbCEmOk1XQEFBSVBKUmk5Xj9QRCRiKCQtQFY0ZFViaFQqXTwiRTVTaytWM09wLj5CNGwoW2I9LHVnIis8ajZCRTVMLlE9cThQTmc1WlNbJzI0bTg9SURGYG9DPztSJGgnczQtZz91XnQkaHU2ai4kOCchPFNOUFBKdHE8c1U3bVAzLTQvQnM5OD5XW2lVMGwkWkJEXS1qdC9OaGEiIiswMDpJTmVTQSVqNUpvLy1KdWgwUV02WmZWbFgqPS87b0lePWxjSSpaP3FgLEFoPVZ1SDNPOnJzOE1oUmdLaiEpT1QtNkRya2JFKjtrO1Y5WyhEXTM/Ky9eWCZlRD5KRjwvaGVRYHJHYlRWY0w9ck0tQGZNLkIjPS86NzUhWFg/PWMpZWU5IU8jNFZUZDpVT0hZYiosUzBTQl5dPzAkJ1NqYTtXVSlzNF48W1AhTHQ6c21qVD1PTFROTiY9PWFqX2dKZ3BbaEo5U2dbYzE1TGZyQCcpcDBGNlxURl8yZSpDViRmOU4kRmpvIjRgT0BiOVUzMS9dISxPM0dvRmhGWlhsLmQ3RUBFRz09ZkNVaWApUGdEMiRWYHVXJlZGRS1DTFNxXytkMD09XWktK0knKEsiOlAqJEpOQTw0KCc8UmpmaGNKaC01JGQkTVlIUDwiQ00lXCM+PSonOmtmLnJuPzM1cWpnVzNNMU9IMXFYQzVKKyJmInUvJmdTUTowPS9eb2YrbG1cW2QqQTJMJUVRUFxgM0lIYiZnIj1NImdRLzZsKSItSCUlVVM/Jl5bZS9pKyIiIjBYISUoXS1ecVEvXihERmw7OmdQRmcvPzJaITBuIiphbzxNN2wyLUE6Q1hPSnFrWTcmJSVDRz0mWzMvT2BrQVg1P2xvT1xpdEcuQyNbJUtBMEIiRSdScDFBPklfdFJBT0QzQS4kU1Yqc1JeLERdMzdWIWhBPmhKV0s5cydBbmlyVDRjNWk8I1VBXFViIVpzM0ZbW1NpPT08LFpsNDMjXyY1NE9ZSyZVUERALlBkTyU0YGwtJiQjYDQubHFDTSJfRG1HSktBLTxEOFsuVDxZalg4ZyUoRTdVQS5NWWI8ZDlBOGo4QV5dRSRoPCZlOVNqLlhWJUcsJTVZUCtrbzI1NVJvO2hvLTstZjE/UjpfOjNUOnEpK05PWSRiLC9YbEssJ29EKFEhUmQ+JElQRFVZTVFUWU1tJyQuPzBnYl42XDtAUkJdYiRaQm1ecCgxX0MpJzAzaSlybXRPdVpTUztSLTgxMEdQKUUvaGFsRCgtM1ZYNWUiL0BWL0g6Kz1AUyskSzY6Uyh1JEtcJmRoUCJaQUBXZW5aRzdfKz0pXD9zQDtiTnE8Z0ctMjhkN2dMS2ssZmRpbUhEM3BtSCVvMDEkc2MpUVhxITEhQGJyVHRPJUdAJz4xRFh0R1lAPTE1RGFuYDMrYCMlVVlYSGUnIz9RaEpiJSgzPmcvU2JvVlciPz8qZVhOUE9XXV1gXEk3RlltSWFWI0BlMkVRVl9aa1RUMVkvXEpCZycvQG9DKjZXVjtpOEFeKlRoT1otUmdJUWs2JjtmQHNkOF8sWUoyQlZNUSFJRlQvWEZBL1s2QyFuT1hybGY2ZCE4TmlTPWUhLlVqRjREWUghWm4uYSRGUk0yYEFGN1A8bmlMNDgnWi5HMjxrWjBDOSVWaTlOZF1yKCk1JVBcX1BTYSVMLHNPUCchXUI+c2BFbXNCT2ZeIWsiaCshVTxJcW8yMnFaKU5JO0dsLGxpQmJjXS03Sj1edGdiUTtjPm9ELjBeQHA4WydoRld0VFdPY3AudTZydSksaDswOGcsKjJzKSVpbWBWcTQwR1FHVm8jN0FQXDpjK1ovSUwiQWRfN11PNThaX0cocGpxSGwwZUFXcSpWaT4lLyRtWF0xVlFXLTNlK2MramhVYCokVjxgJWRdQ1JBTiJAS1EoMD8wVF0uTjBeXUsnYDh1aXNYUyUpdGMtQSFpcVhQMjQkUiJzZD5RXD0+YkwtU3ExcEBLSDo1aSUlaVdwQlhYZSclVTBiNjg8WXNGM1xEYWhFRmVpMDFoVEp0UTtnSDJlakRocEJpbVZgRjszKjVJLi0hM18rQmtfW10wUWNjQlVmXmVzLCdwXkYuK2skKmsiWG03Xz0xbnJxRGwsKj5yTldtKTQyYjFkdUMuM2xXJlljTWxeXTJlM1FtPkJGWFAxRC07LFBWInNgNS0kb2BlOXIiNTBUKyRRW2AiQSl1L203Mk85dT9uVjRZNFYjIjdyZlxySjBYR2lRSDFEU3NYQDlQVm10WjJpaStYPVdiWj1nbDxeUEk8Y09cS2BBVzRiLVRIZEsqZi1ER0UxM1U8c1NJNSlSPi9FLlJGKlU4WC89RkVDU1lxcnA6V2ZwNFpzJ0NKZCFEKjI/JSI2aiotKl5PJjlpL0hFVClaYVlBUUZkRzErS0Q+bEJsRT1xOz9jXitQLEVwZmwvXU5yPkVQYUJgKXVAMkVpZTc1TSVdTzQvbyIvLVBwWjMqMTJrbjQlcnJXUm01I01+PmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDEyCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDA2MSAwMDAwMCBuIAowMDAwMDAwMTAyIDAwMDAwIG4gCjAwMDAwMDAyMDkgMDAwMDAgbiAKMDAwMDAwMDMyMSAwMDAwMCBuIAowMDAwMDAwNTI5IDAwMDAwIG4gCjAwMDAwMDA3MTggMDAwMDAgbiAKMDAwMDAwMDg5OCAwMDAwMCBuIAowMDAwMDAxMTMzIDAwMDAwIG4gCjAwMDAwMDEyMDIgMDAwMDAgbiAKMDAwMDAwMTUxMCAwMDAwMCBuIAowMDAwMDAxNTcwIDAwMDAwIG4gCnRyYWlsZXIKPDwKL0lEIApbPDdjOTZmMDgzZTMzNmE4MjA4YTg4YTA2ODJkZTAyNzUzPjw3Yzk2ZjA4M2UzMzZhODIwOGE4OGEwNjgyZGUwMjc1Mz5dCiUgUmVwb3J0TGFiIGdlbmVyYXRlZCBQREYgZG9jdW1lbnQgLS0gZGlnZXN0IChvcGVuc291cmNlKQoKL0luZm8gOSAwIFIKL1Jvb3QgOCAwIFIKL1NpemUgMTIKPj4Kc3RhcnR4cmVmCjQ4NTcKJSVFT0YK';

interface ResumeDownloadProps {
  variant?: 'hero' | 'nav' | 'nav-mobile' | 'footer';
  className?: string;
}

export const ResumeDownload: React.FC<ResumeDownloadProps> = ({
  variant = 'hero',
  className = '',
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default so page never reloads or navigates away
    e.preventDefault();
    setErrorMessage(null);

    try {
      // 1. Decode base64 using atob
      const byteCharacters = atob(RESUME_PDF_BASE64);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      // 2. Create Blob with type application/pdf
      const blob = new Blob([byteNumbers], { type: 'application/pdf' });

      // 3. Create object URL
      const blobUrl = URL.createObjectURL(blob);

      // 4. Create temporary anchor element and trigger download
      const tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.download = 'Koushiga_S_Jayandran_Resume.pdf';
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();

      // 5. Cleanup temporary element and revoke URL after 1 second
      document.body.removeChild(tempLink);
      window.setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 1000);
    } catch (err) {
      console.error('Resume download error:', err);
      setErrorMessage('Download failed, please try again');
    }
  };

  if (variant === 'nav') {
    return (
      <div className="relative inline-flex flex-col items-center">
        <button
          type="button"
          onClick={handleDownload}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#9AA3AF] hover:text-white border border-white/10 hover:border-[#7FA6E0]/40 transition-all cursor-pointer ${className}`}
        >
          <Download className="w-3.5 h-3.5 text-[#7FA6E0]" />
          <span>Download resume</span>
        </button>
        {errorMessage && (
          <span className="absolute top-full mt-1.5 whitespace-nowrap text-[11px] text-red-400 bg-[#0A0A0B] border border-red-500/30 px-2 py-0.5 rounded shadow-lg z-50">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'nav-mobile') {
    return (
      <div className="w-full flex flex-col items-center">
        <button
          type="button"
          onClick={handleDownload}
          className={`w-full py-2.5 px-3 rounded-lg text-center text-sm font-medium border border-white/15 text-[#F2F4F7] hover:border-[#7FA6E0]/50 hover:bg-white/5 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer ${className}`}
        >
          <Download className="w-4 h-4 text-[#7FA6E0]" />
          <span>Download resume</span>
        </button>
        {errorMessage && (
          <span className="mt-1 text-xs text-red-400">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="relative inline-flex items-center">
        <button
          type="button"
          onClick={handleDownload}
          className={`text-[#7FA6E0] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer ${className}`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download resume</span>
        </button>
        {errorMessage && (
          <span className="absolute bottom-full mb-1.5 left-0 whitespace-nowrap text-[11px] text-red-400 bg-[#0A0A0B] border border-red-500/30 px-2 py-0.5 rounded shadow-lg z-50">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }

  // Default: 'hero' variant
  return (
    <div className="relative inline-flex flex-col items-center md:items-start">
      <button
        type="button"
        onClick={handleDownload}
        className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0A0A0B] text-[#F2F4F7] text-sm font-medium border border-white/15 hover:border-[#7FA6E0]/50 hover:bg-[#111113] transition-all duration-200 cursor-pointer ${className}`}
      >
        <Download className="w-4 h-4 text-[#7FA6E0]" />
        <span>Download resume</span>
      </button>
      {errorMessage && (
        <span className="mt-2 text-xs text-red-400 bg-[#111113] border border-red-500/30 px-2.5 py-1 rounded-md">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
