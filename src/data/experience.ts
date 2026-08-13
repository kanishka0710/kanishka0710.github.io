export type Experience = {
	org: string;
	href?: string;
	role: string;
	detail?: string;
	dates: string;
	blurb: string;
};

export const experience: Experience[] = [
	{
		org: "Wireless Lab at UCLA",
		href: "https://wireless.ee.ucla.edu/",
		role: "Graduate Student Researcher",
		detail: "P.I. Ian Roberts",
		dates: "Jan 2025 — Present",
		blurb: "ML for mmWave orientation and location prediction, plus a ROS platform that captures 60 GHz CSI and FTM."
	},
	{
		org: "SkyGig",
		href: "https://sky-gig.com/",
		role: "RF System Design Intern",
		dates: "Jun 2025 — Jun 2026",
		blurb: "Phased-array simulators, mmWave RF-chain validation, and 5G channel-modeling tools."
	},
	{
		org: "WCSNG Lab at UC San Diego",
		href: "https://wcsng.ucsd.edu/",
		role: "Undergraduate Researcher",
		detail: "P.I. Dinesh Bharadia",
		dates: "May 2021 — Jun 2025",
		blurb: "Privacy-preserving Wi-Fi CSI localization with federated learning, at sub-meter median error."
	},
	{
		org: "The MITRE Corporation",
		href: "https://www.mitre.org/",
		role: "Electrical Engineering Intern",
		dates: "Jun — Sep 2023",
		blurb: "MATLAB spectrum sensing that correlated LTE/5G with NOAA satellite signals at 90%+ accuracy."
	}
];
