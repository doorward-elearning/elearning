export interface OvSettings {
	chat: boolean;
	autopublish: boolean;
	logoUrl: string;
	toolbarButtons: {
		audio: boolean;
		video: boolean;
		screenShare: boolean;
		fullscreen: boolean;
		layoutSpeaking: boolean;
		exit: boolean;
	};
}
