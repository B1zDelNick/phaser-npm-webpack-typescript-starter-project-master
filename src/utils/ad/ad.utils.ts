export class AdUtils {

    private static adsManager: any = null;
    private static adsLoader: any = null;
    private static adDisplayContainer: any = null;
    private static adContainer: any = null;
    private static intervalTimer;
    private static videoContent: any = null;
    private static adUrl: string = '';

    public static init(url: string) {
        if (!this.areAdsEnabled()) return;

        this.adUrl = url;

        this.videoContent = document.getElementById('contentElement');
        this.adContainer = document.getElementById('adContainer');

        this.setUpIMA();
    }

    private static setUpIMA() {
        // Create the ad display container.
        this.createAdDisplayContainer();
        // Create ads loader.
        this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
        // Listen and respond to ads loaded and error events.
        this.adsLoader.addEventListener(
            google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
            this.onAdsManagerLoaded,
            false);
        this.adsLoader.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            this.onAdError,
            false);

        // Request video ads.
        const adsRequest: any = new google.ima.AdsRequest();
        adsRequest.adTagUrl = this.adUrl;

        // Specify the linear and nonlinear slot sizes. This helps the SDK to
        // select the correct creative if multiple are returned.
        adsRequest.linearAdSlotWidth = 640;
        adsRequest.linearAdSlotHeight = 400;

        adsRequest.nonLinearAdSlotWidth = 640;
        adsRequest.nonLinearAdSlotHeight = 150;

        this.adsLoader.requestAds(adsRequest);
    }

    private static playAds() {
        // Request video ads.
        const adsRequest = new google.ima.AdsRequest();
        adsRequest.adTagUrl = this.adUrl;
        // Specify the linear and nonlinear slot sizes. This helps the SDK to
        // select the correct creative if multiple are returned.
        adsRequest.linearAdSlotWidth = 640;
        adsRequest.linearAdSlotHeight = 400;
        adsRequest.nonLinearAdSlotWidth = 640;
        adsRequest.nonLinearAdSlotHeight = 150;
        this.adsLoader.requestAds(adsRequest);

        // Initialize the container. Must be done via a user action on mobile devices.
        this.adContainer.style.display = 'none';
        this.videoContent.style.display = 'none';
        this.videoContent.load();
        this.adDisplayContainer.initialize();

        try {
            if (DEBUG) console.log('Try to send Ad request.');

            const width = window.innerWidth - 5;
            const height = window.innerHeight - 5;
            // Initialize the ads manager. Ad rules playlist will start at this time.
            this.adsManager.init(width, height, google.ima.ViewMode.NORMAL);
            // Call play to start showing the ad. Single video and overlay ads will
            // start at this time; the call will be ignored for ad rules.
            this.adsManager.start();
        }
        catch (adError) {
            // An error may be thrown if there was a problem with the VAST response.
            this.videoContent.play();
        }
    }

    private static createAdDisplayContainer() {
        // We assume the adContainer is the DOM id of the element that will house the ads.
        this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainer, this.videoContent);
    }

    private static onAdsManagerLoaded(adsManagerLoadedEvent) {
        // Get the ads manager.
        const adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
        // videoContent should be set to the content video element.
        this.adsManager = adsManagerLoadedEvent.getAdsManager(this.videoContent, adsRenderingSettings);

        // Add listeners to the required events.
        this.adsManager.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            this.onAdError);
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
            this.onContentPauseRequested);
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
            this.onContentResumeRequested);
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
            this.onAdEvent);

        // Listen to any additional events, if necessary.
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.LOADED,
            this.onAdEvent);
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.STARTED,
            this.onAdEvent);
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.COMPLETE,
            this.onAdEvent);
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.SKIPPED,
            this.onAdEvent);
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.USER_CLOSE,
            this.onAdEvent);
    }

    private static onAdEvent(adEvent) {
        // Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED) don't have ad object associated.
        let ad = adEvent.getAd();
        if (DEBUG) console.log(adEvent.type, adEvent);

        switch (adEvent.type) {
            case google.ima.AdEvent.Type.LOADED:
                // This is the first event sent for an ad - it is possible to
                // determine whether the ad is a video ad or an overlay.
                if (!ad.isLinear()) {
                    // Position AdDisplayContainer correctly for overlay.
                    // Use ad.width and ad.height.
                    this.adContainer.style.display = 'block';
                    this.videoContent.style.display = 'block';
                    this.videoContent.play();
                    /*if (musicOn) {
                     music.pause();
                     }*/
                }
                break;
            case google.ima.AdEvent.Type.STARTED:
                // This event indicates the ad has started - the video player
                // can adjust the UI, for example display a pause button and
                // remaining time.
                if (ad.isLinear()) {
                    // For a linear ad, a timer can be started to poll for
                    // the remaining time.
                    this.intervalTimer = setInterval(
                        function()
                        {
                            let remainingTime = this.adsManager.getRemainingTime();
                        },
                        300); // every 300ms
                }
                this.adContainer.style.display = 'block';
                this.videoContent.style.display = 'block';
                /*if (musicOn) {
                    music.pause();
                }*/
                break;
            case google.ima.AdEvent.Type.COMPLETE:
                // This event indicates the ad has finished - the video player
                // can perform appropriate UI actions, such as removing the timer for
                // remaining time detection.
                if (ad.isLinear()) {
                    clearInterval(this.intervalTimer);
                }
                this.adContainer.style.display = 'none';
                this.videoContent.style.display = 'none';
                /*if (musicOn) {
                    music.resume();
                }*/
                break;
            case google.ima.AdEvent.Type.SKIPPED:
                this.adContainer.style.display = 'none';
                this.videoContent.style.display = 'none';
                /*if (musicOn) {
                    music.resume();
                }*/
                if (DEBUG) console.log('Skip AD.');
                break;
            case google.ima.AdEvent.Type.USER_CLOSE:
                this.adContainer.style.display = 'none';
                this.videoContent.style.display = 'none';
                /*if (musicOn) {
                    music.resume();
                }*/
                if (DEBUG) console.log('AD closed.');
                break;
        }
    }

    private static onAdError(adErrorEvent) {
        // Handle the error logging.
        if (DEBUG) console.log(adErrorEvent.getError());
        this.adsManager.destroy();
        this.adContainer.style.display = 'none';
        this.videoContent.style.display = 'none';
        /*if (musicOn) {
            music.resume();
        }*/
    }

    private static onContentPauseRequested() {
        this.videoContent.pause();
        // This function is where you should setup UI for showing ads (e.g.
        // display ad timer countdown, disable seeking etc.)
        // setupUIForAds();
        this.adContainer.style.display = 'block';
        this.videoContent.style.display = 'block';
        /*if (musicOn) {
            music.pause();
        }*/
    }

    private static onContentResumeRequested() {
        this.videoContent.play();
        // This function is where you should ensure that your UI is ready
        // to play content. It is the responsibility of the Publisher to
        // implement this function when necessary.
        this.adContainer.style.display = 'none';
        this.videoContent.style.display = 'none';
        /*if (musicOn) {
            music.resume();
        }*/
    }

    public static areAdsEnabled(): boolean {
        const test = document.createElement('div');
        test.innerHTML = '&nbsp;';
        test.className = 'adsbox';
        document.body.appendChild(test);
        let adsEnabled;
        const isEnabled = function ()
        {
            let enabled = true;
            if (test.offsetHeight === 0) {
                enabled = false;
            }
            test.parentNode.removeChild(test);
            return enabled;
        };
        window.setTimeout(adsEnabled = isEnabled(), 100);
        return adsEnabled;
    }
}