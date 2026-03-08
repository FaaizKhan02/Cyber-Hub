const fs = require('fs');

const file = 'script.js';
let content = fs.readFileSync(file, 'utf8');

const attackDetailsMap = {
    "wannacry": {
        howItHappens: "Attackers exploited the EternalBlue vulnerability in the SMBv1 protocol to execute arbitrary code. The loophole was unpatched, internet-exposed SMB services running outdated Windows versions.",
        whyItHappens: "Financial gain and mass disruption. Attackers wanted to ransom critical systems at a large scale.",
        howToStop: "Immediate response involved isolating infected networks, identifying a hardcoded kill-switch domain, and pushing emergency patches.",
        futurePrevention: "Organizations must implement robust patch management, disable legacy protocols like SMBv1, and maintain offline verified backups."
    },
    "notpetya": {
        howItHappens: "Attackers compromised the update mechanism of M.E.Doc, a Ukrainian tax software, distributing a wiper masked as ransomware. The loophole was the implicit trust placed in third-party software updates.",
        whyItHappens: "State-level sabotage and disruption targeted at Ukraine, which spilled over globally.",
        howToStop: "Defenders severed connections to Ukrainian offices and rebuilt Active Directory environments entirely from clean backups.",
        futurePrevention: "Harden supply chains, rigorously verify software updates, and segment networks to prevent lateral movement of malware."
    },
    "stuxnet": {
        howItHappens: "Using multiple zero-day exploits and infected USB drives, the malware crossed air-gapped networks to modify PLC firmware. The loophole was weak physical security and an inability to monitor industrial protocol logic.",
        whyItHappens: "Nation-state sabotage aiming to physically destroy uranium enrichment centrifuges.",
        howToStop: "Discovery by security researchers led to immediate patching by vendors and eventual replacement of infected hardware.",
        futurePrevention: "Strict control of removable media, deep packet inspection of OT networks, and continuous integrity checks on Industrial Control Systems."
    },
    "equifax": {
        howItHappens: "Hackers exploited a known, unpatched vulnerability in the Apache Struts web framework. The loophole was a failure in asset inventory and an inability to patch internet-facing systems in a timely manner.",
        whyItHappens: "Massive scale data theft for espionage and future criminal exploitation.",
        howToStop: "The breach was ultimately discovered via suspicious network traffic; systems were taken offline and rebuilt.",
        futurePrevention: "Institute automated, risk-based vulnerability management, segment sensitive databases, and enforce data minimization."
    },
    "solarwinds": {
        howItHappens: "Attackers infiltrated the vendor's build pipeline and injected a backdoor into digitally signed updates. The loophole was inadequate security and monitoring within the software development lifecycle (SDLC).",
        whyItHappens: "Highly stealthy espionage aiming to access government and enterprise networks globally.",
        howToStop: "Incident responders revoked compromised certificates, rotated all administrative credentials, and quarantined the affected Orion software.",
        futurePrevention: "Adopt Zero Trust architectures, mandate secure reproducible builds, and thoroughly audit third-party vendor access."
    }
};

const defaultDetail = {
    howItHappens: "Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.",
    whyItHappens: "Usually motivated by financial extortion, data theft, or service disruption.",
    howToStop: "Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.",
    futurePrevention: "They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."
};

let match = content.match(/const attacks = (\[[\s\S]*?\n\]);/);
if (match) {
    let attacksStr = match[1];
    // Safe evaluation
    let attacksObj = eval(attacksStr);
    attacksObj.forEach(a => {
        let d = attackDetailsMap[a.id] || defaultDetail;
        a.howItHappens = d.howItHappens;
        a.whyItHappens = d.whyItHappens;
        a.howToStop = d.howToStop;
        a.futurePrevention = d.futurePrevention;
    });

    let newAttacksStr = "const attacks = [\n" + attacksObj.map(a => JSON.stringify(a)).join(",\n") + "\n];";
    let newContent = content.replace(/const attacks = \[\s*[\s\S]*?\n\];/, newAttacksStr);
    fs.writeFileSync(file, newContent);
    console.log("Attacks updated successfully.");
} else {
    console.error("Could not find the attacks array.");
}
