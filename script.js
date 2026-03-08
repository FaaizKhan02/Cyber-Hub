// =====================
// Core attack dataset (expanded to 30+)
// =====================
const attacks = [
{"id":"wannacry","name":"WannaCry Ransomware","year":2017,"type":["Ransomware","Malware"],"targets":"Hospitals, telecoms, transport running unpatched Windows","severity":"Critical","actors":"Lazarus Group (North Korea-linked)","vector":"Exploited EternalBlue SMBv1 vulnerability to self-propagate","impact":"Disrupted 300k+ systems in 150+ countries, cancelled surgeries, major downtime.","resolution":"Emergency patching, kill-switch domain discovery, accelerated patch management.","lessons":["Unpatched internet-exposed services can cause global incidents.","Legacy protocols like SMBv1 are dangerous.","Tested backups are essential."],"mitigations":["Patch promptly, disable SMBv1.","Segment networks.","Deploy endpoint ransomware detection."],"origins":["as"],"regions":["eu","na","as","sa","oc"],"howItHappens":"Attackers exploited the EternalBlue vulnerability in the SMBv1 protocol to execute arbitrary code. The loophole was unpatched, internet-exposed SMB services running outdated Windows versions.","whyItHappens":"Financial gain and mass disruption. Attackers wanted to ransom critical systems at a large scale.","howToStop":"Immediate response involved isolating infected networks, identifying a hardcoded kill-switch domain, and pushing emergency patches.","futurePrevention":"Organizations must implement robust patch management, disable legacy protocols like SMBv1, and maintain offline verified backups."},
{"id":"notpetya","name":"NotPetya Supply-Chain Wiper","year":2017,"type":["Ransomware","Malware","Supply Chain"],"targets":"Enterprises connected to Ukraine; shipping, logistics","severity":"Critical","actors":"State-sponsored group targeting Ukrainian infrastructure","vector":"Compromised Ukrainian tax software update, then lateral movement","impact":"Billions in damages globally. Some firms rebuilt entire IT environments.","resolution":"Rebuilt networks from clean images; vendors hardened update infrastructure.","lessons":["Supply chains are powerful compromise points.","Ransomware-looking attacks may be wipers.","Third-party risk needs attention."],"mitigations":["Harden software update channels.","Segment and limit admin credentials.","Monitor high-privilege software."],"origins":["eu"],"regions":["eu","na","as"],"howItHappens":"Attackers compromised the update mechanism of M.E.Doc, a Ukrainian tax software, distributing a wiper masked as ransomware. The loophole was the implicit trust placed in third-party software updates.","whyItHappens":"State-level sabotage and disruption targeted at Ukraine, which spilled over globally.","howToStop":"Defenders severed connections to Ukrainian offices and rebuilt Active Directory environments entirely from clean backups.","futurePrevention":"Harden supply chains, rigorously verify software updates, and segment networks to prevent lateral movement of malware."},
{"id":"stuxnet","name":"Stuxnet Industrial Sabotage","year":2010,"type":["Malware"],"targets":"Industrial control systems in nuclear facilities","severity":"Critical","actors":"Nation-state actors (highly targeted campaign)","vector":"Multiple zero-days + infected USB to reach air-gapped networks, altered PLC logic","impact":"Damaged centrifuges and disrupted nuclear enrichment while remaining stealthy.","resolution":"Discovered by researchers; patches released, environments replaced.","lessons":["ICS can be targets of sophisticated malware.","Air-gapping alone is insufficient.","OT needs specialised monitoring."],"mitigations":["Strict removable media controls.","Segregate OT/IT networks.","Strong PLC change management."],"origins":["na","me"],"regions":["me"],"howItHappens":"Using multiple zero-day exploits and infected USB drives, the malware crossed air-gapped networks to modify PLC firmware. The loophole was weak physical security and an inability to monitor industrial protocol logic.","whyItHappens":"Nation-state sabotage aiming to physically destroy uranium enrichment centrifuges.","howToStop":"Discovery by security researchers led to immediate patching by vendors and eventual replacement of infected hardware.","futurePrevention":"Strict control of removable media, deep packet inspection of OT networks, and continuous integrity checks on Industrial Control Systems."},
{"id":"equifax","name":"Equifax Data Breach","year":2017,"type":["Web Application"],"targets":"Consumer credit data, personal information","severity":"Critical","actors":"Unknown advanced attackers","vector":"Exploited unpatched Apache Struts vulnerability","impact":"Exposed data of 147 million people; regulatory penalties, years of remediation.","resolution":"Rebuilt systems, patched software, invested in security improvements.","lessons":["Internet-facing apps with known vulns are prime targets.","Asset inventory and patching must cover everything.","Data minimisation reduces breach impact."],"mitigations":["Automatic risk-based patching.","WAF and runtime protection.","Regular security testing."],"origins":["na"],"regions":["na"],"howItHappens":"Hackers exploited a known, unpatched vulnerability in the Apache Struts web framework. The loophole was a failure in asset inventory and an inability to patch internet-facing systems in a timely manner.","whyItHappens":"Massive scale data theft for espionage and future criminal exploitation.","howToStop":"The breach was ultimately discovered via suspicious network traffic; systems were taken offline and rebuilt.","futurePrevention":"Institute automated, risk-based vulnerability management, segment sensitive databases, and enforce data minimization."},
{"id":"solarwinds","name":"SolarWinds Supply-Chain","year":2020,"type":["Supply Chain","Espionage"],"targets":"Government agencies and enterprises using Orion software","severity":"Critical","actors":"Sophisticated state-linked espionage actor","vector":"Compromised vendor build pipeline, distributed signed malicious updates","impact":"Stealthy access into numerous high-value networks; complex investigation.","resolution":"Rotated components, new keys/build systems, extensive incident response.","lessons":["Build pipelines are high-value targets.","Even trusted updates must be monitored.","Supply-chain security is shared responsibility."],"mitigations":["Secure build systems with isolation.","Monitor management software closely.","Adopt zero-trust principles."],"origins":["eu","as"],"regions":["na","eu","as"],"howItHappens":"Attackers infiltrated the vendor's build pipeline and injected a backdoor into digitally signed updates. The loophole was inadequate security and monitoring within the software development lifecycle (SDLC).","whyItHappens":"Highly stealthy espionage aiming to access government and enterprise networks globally.","howToStop":"Incident responders revoked compromised certificates, rotated all administrative credentials, and quarantined the affected Orion software.","futurePrevention":"Adopt Zero Trust architectures, mandate secure reproducible builds, and thoroughly audit third-party vendor access."},
{"id":"colonial-pipeline","name":"Colonial Pipeline Ransomware","year":2021,"type":["Ransomware"],"targets":"Fuel pipeline operator and IT systems","severity":"Critical","actors":"Criminal ransomware-as-a-service group","vector":"Compromised VPN account without MFA","impact":"Major pipeline shutdown, fuel shortages, emergency declarations in the US.","resolution":"Operations restored, ransom partially recovered, sector increased resilience.","lessons":["Single-factor remote access is a major risk.","IT incidents affect OT operations.","Sector collaboration is essential."],"mitigations":["MFA on all remote access.","Segment OT/IT with playbooks.","Monitor privileged accounts."],"origins":["na"],"regions":["na"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"yahoo-breaches","name":"Yahoo Mega Breaches","year":2013,"type":["Web Application"],"targets":"User accounts on major email platform","severity":"Critical","actors":"Criminal and state-linked actors","vector":"Exploited app weaknesses, stolen credentials over years","impact":"Billions of accounts affected; trust, valuation, and regulatory impact.","resolution":"Accounts reset, security posture strengthened.","lessons":["Large platforms attract persistent attackers.","Legacy auth models increase risk.","Transparent communication builds trust."],"mitigations":["Modern authentication with MFA.","Harden account recovery flows.","Retire legacy features."],"origins":["as","eu"],"regions":["na","eu","as","sa"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"target-pos","name":"Target POS Breach","year":2013,"type":["Supply Chain","Malware"],"targets":"Point-of-sale systems in retail stores","severity":"High","actors":"Criminal group focused on payment card theft","vector":"Compromised third-party vendor, pivoted to POS terminals with memory-scraping malware","impact":"Tens of millions of payment cards compromised.","resolution":"Systems rebuilt, vendor access controls strengthened.","lessons":["Third-party access must be controlled.","Payment environments need segmentation.","POS malware exfiltrates silently."],"mitigations":["Limit vendor access.","Segment payment networks.","Encrypt card data, monitor outbound traffic."],"origins":["na"],"regions":["na"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"bank-ddos","name":"Large-Scale DDoS on Banks","year":2012,"type":["DDoS"],"targets":"Online banking portals","severity":"High","actors":"Hacktivist and criminal botnets","vector":"Coordinated HTTP/TCP floods from large botnets","impact":"Banking portals intermittently unavailable.","resolution":"Traffic filtering, scrubbing, architectural changes.","lessons":["Critical services need DDoS resilience.","DDoS often combined with extortion.","Third-party protection is crucial."],"mitigations":["Use CDNs and DDoS mitigation.","Design with scalable capacity.","Practice with ISPs/vendors."],"origins":["as","eu"],"regions":["na","eu","as"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"sql-injection","name":"SQL Injection","year":0,"type":["Web Application"],"targets":"Web apps embedding user input in DB queries","severity":"High","actors":"Low-skilled to advanced attackers","vector":"Attacker input inserted into SQL queries without parameterisation","impact":"Data disclosure, privilege escalation, database compromise.","resolution":"Fix code to use parameterised queries.","lessons":["Never concatenate user input into SQL.","Secure coding is everyday work.","Automated scanning catches many issues."],"mitigations":["Use parameterised queries/ORMs.","Input validation and output encoding.","Least privilege on DB accounts."],"origins":["na","eu","as"],"regions":["na","eu","as","sa","oc","af","me"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"xss","name":"Cross-Site Scripting (XSS)","year":0,"type":["Web Application"],"targets":"Web browsers and apps reflecting untrusted input","severity":"Medium","actors":"Attackers stealing sessions or defacing content","vector":"Malicious scripts injected via unsanitised fields or URLs","impact":"Session hijacking, credential theft, defacement.","resolution":"Sanitise output, encoding, Content Security Policy.","lessons":["Browsers execute any script unless restricted.","Trust boundaries exist inside apps.","Security headers reduce mistakes."],"mitigations":["Escape all untrusted data.","Implement CSP.","Use templating frameworks carefully."],"origins":["na","eu","as"],"regions":["na","eu","as","sa","oc","af","me"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"phishing","name":"Phishing & Spear-Phishing","year":0,"type":["Phishing"],"targets":"Employees, customers via email/messaging/voice","severity":"High","actors":"Criminal groups, ransomware affiliates, state operators","vector":"Deceptive messages trick victims into clicking/sharing secrets","impact":"Account takeover, malware, fraud, ransomware entry.","resolution":"Block malicious messages, reset accounts, educate users.","lessons":["People are often the easiest way in.","Attackers refine lures continuously.","Tech controls + education work together."],"mitigations":["Modern email security filtering.","Phishing-resistant MFA.","Regular awareness training."],"origins":["na","eu","as","sa","af"],"regions":["na","eu","as","sa","oc","af","me"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"credential-stuffing","name":"Credential Stuffing","year":0,"type":["Phishing"],"targets":"Online accounts where users reuse passwords","severity":"Medium","actors":"Criminals with automated tools and breach lists","vector":"Breached username/password pairs tested against other sites","impact":"Account takeover, fraudulent purchases.","resolution":"Reset credentials, add verification, monitor logins.","lessons":["Password reuse links separate incidents.","Attackers leverage automation.","Login flows must handle hostile traffic."],"mitigations":["Enforce MFA, unique passwords.","Monitor unusual login patterns.","Rate limiting and bot detection."],"origins":["na","eu","as"],"regions":["na","eu","as","sa","oc"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"insider-threats","name":"Insider Threats","year":0,"type":["Insider"],"targets":"Any org where insiders hold privileged access","severity":"High","actors":"Employees, contractors, partners","vector":"Misuse of legitimate access to copy data or change configs","impact":"Data theft, sabotage, accidental exposure.","resolution":"Investigations, access revocation, legal action.","lessons":["Trust must accompany monitoring.","Most insiders aren't malicious but cause harm.","Culture matters as much as tools."],"mitigations":["Least privilege & access reviews.","Monitor sensitive data movements.","Clear policies and training."],"origins":["na","eu","as","sa","af","me","oc"],"regions":["na","eu","as","sa","af","me","oc"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"log4shell","name":"Log4Shell (Log4j)","year":2021,"type":["Web Application","Malware"],"targets":"Any application using Apache Log4j 2","severity":"Critical","actors":"From script kiddies to nation-state actors","vector":"Crafted string in log messages triggers remote code execution via JNDI lookup","impact":"Massive internet-wide scanning; compromised servers worldwide.","resolution":"Emergency patching, WAF rules, removing vulnerable dependency.","lessons":["Ubiquitous libraries create systemic risk.","SBOM and dependency tracking is critical.","Defenders need rapid response capability."],"mitigations":["Patch Log4j immediately.","WAF rules to block JNDI strings.","Dependency scanning in CI/CD."],"origins":["na","eu","as"],"regions":["na","eu","as","sa","oc","af","me"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"heartbleed","name":"Heartbleed (OpenSSL)","year":2014,"type":["Web Application"],"targets":"Servers and devices using vulnerable OpenSSL","severity":"Critical","actors":"Anyone who could craft a malicious heartbeat request","vector":"Buffer over-read in OpenSSL TLS heartbeat extension leaked server memory","impact":"Private keys, passwords, and session data exposed across the internet.","resolution":"Patch OpenSSL, reissue certificates, rotate credentials.","lessons":["Critical libraries need security audits.","Even widely-used code can have severe bugs.","Certificate reissuance is part of incident response."],"mitigations":["Patch OpenSSL immediately.","Reissue TLS certificates.","Memory-safe languages reduce these bugs."],"origins":["na","eu"],"regions":["na","eu","as","sa","oc"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"kaseya","name":"Kaseya VSA Ransomware","year":2021,"type":["Ransomware","Supply Chain"],"targets":"MSPs and their customers via Kaseya VSA","severity":"Critical","actors":"REvil ransomware group","vector":"Exploited zero-day in Kaseya VSA to push ransomware to MSP customers","impact":"1,500+ businesses affected globally through supply-chain cascade.","resolution":"Kaseya patches, universal decryptor eventually released.","lessons":["MSPs are high-value supply-chain targets.","Zero-days in management tools have massive blast radius.","Supply-chain attacks compound quickly."],"mitigations":["Patch management tools urgently.","Segment MSP access.","Incident response plans for supply-chain scenarios."],"origins":["eu"],"regions":["na","eu","as","sa","oc"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"moveit","name":"MOVEit Transfer Exploit","year":2023,"type":["Web Application","Supply Chain"],"targets":"Organisations using MOVEit file transfer software","severity":"Critical","actors":"Cl0p ransomware/extortion group","vector":"SQL injection zero-day in MOVEit Transfer web application","impact":"Thousands of organisations breached; mass data theft without encryption.","resolution":"Emergency patches, threat hunting, mass breach notifications.","lessons":["File transfer appliances are high-value targets.","Mass exploitation can happen before patches exist.","Data theft alone is sufficient for extortion."],"mitigations":["Patch file transfer tools immediately.","WAF and monitoring on transfer apps.","Minimise data stored in transfer systems."],"origins":["eu"],"regions":["na","eu","as","oc"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"uber-breach","name":"Uber Social Engineering Breach","year":2022,"type":["Phishing","Insider"],"targets":"Uber corporate systems and internal tools","severity":"High","actors":"Teenager using social engineering","vector":"MFA fatigue attack + social engineering of IT support","impact":"Access to internal systems, Slack, vulnerability reports.","resolution":"Contained access, hardened MFA, reviewed internal access controls.","lessons":["MFA fatigue is a real attack vector.","Social engineering bypasses technical controls.","Internal tools need segmentation."],"mitigations":["Number-matching MFA.","Train IT support on social engineering.","Zero-trust for internal tools."],"origins":["na"],"regions":["na"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"mgm-resorts","name":"MGM Resorts Breach","year":2023,"type":["Ransomware","Phishing"],"targets":"MGM Resorts casino and hotel systems","severity":"Critical","actors":"Scattered Spider / ALPHV affiliates","vector":"Vishing (voice phishing) call to IT help desk to reset credentials","impact":"$100M+ losses, hotel systems down for days, slot machines offline.","resolution":"Systems rebuilt, identity controls strengthened.","lessons":["Help desk is a critical attack surface.","Voice-based social engineering is highly effective.","Casino/hospitality sector is high-value target."],"mitigations":["Verify identity before credential resets.","Phishing-resistant MFA.","Segment guest and operational systems."],"origins":["na"],"regions":["na"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"operation-aurora","name":"Operation Aurora","year":2010,"type":["Espionage","Malware"],"targets":"Google, Adobe, and other tech companies","severity":"Critical","actors":"State-sponsored Chinese threat group","vector":"Zero-day Internet Explorer exploit via spear-phishing","impact":"Source code theft, Gmail accounts of activists accessed.","resolution":"Google hardened infrastructure, shifted to more secure architecture.","lessons":["Even top tech companies can be compromised.","Intellectual property theft has strategic value.","Zero-days combined with social engineering are potent."],"mitigations":["Advanced endpoint protection.","Network segmentation.","Threat intelligence sharing."],"origins":["as"],"regions":["na"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"mirai-botnet","name":"Mirai IoT Botnet","year":2016,"type":["DDoS","Malware"],"targets":"IoT devices, DNS infrastructure","severity":"High","actors":"Initially hobbyist hackers, then criminal groups","vector":"Scanned for IoT devices with default credentials, enrolled them in botnet","impact":"Took down Dyn DNS; major sites (Twitter, Netflix, Reddit) unavailable.","resolution":"ISPs filtered traffic, device manufacturers improved defaults.","lessons":["IoT devices with default passwords are weaponisable.","DNS infrastructure is a single point of failure.","Botnet source code release multiplied the threat."],"mitigations":["Change default IoT credentials.","Network-level IoT segmentation.","Multiple DNS providers for resilience."],"origins":["na"],"regions":["na","eu","as"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"marriott-breach","name":"Marriott/Starwood Breach","year":2018,"type":["Web Application","Espionage"],"targets":"Starwood hotel reservation database","severity":"Critical","actors":"State-linked espionage group","vector":"Compromised Starwood systems years before Marriott acquisition","impact":"500 million guest records exposed including passport numbers.","resolution":"Database encrypted, monitoring enhanced, regulatory fines.","lessons":["M&A due diligence must include cybersecurity.","Long-dwell-time breaches go undetected.","Personal data exposure has lasting consequences."],"mitigations":["Cybersecurity due diligence in acquisitions.","Encrypt sensitive databases.","Continuous monitoring for lateral movement."],"origins":["as"],"regions":["na","eu","as"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"emotet","name":"Emotet Malware","year":2014,"type":["Malware","Phishing"],"targets":"Organisations worldwide via email","severity":"High","actors":"Cybercriminal group operating malware-as-a-service","vector":"Malicious email attachments (Office macros) delivering modular malware","impact":"Enabled follow-on attacks including ransomware deployments globally.","resolution":"International law enforcement takedown in 2021.","lessons":["Malware-as-a-service lowers barriers to entry.","Email remains the most common initial vector.","Law enforcement cooperation can disrupt operations."],"mitigations":["Block Office macro execution.","Advanced email filtering.","EDR for detecting modular malware."],"origins":["eu"],"regions":["na","eu","as","sa"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"cryptojacking","name":"Cryptojacking Campaigns","year":0,"type":["Malware"],"targets":"Servers, cloud instances, browsers","severity":"Medium","actors":"Financially motivated criminals","vector":"Inject cryptocurrency mining scripts via compromised websites or server exploits","impact":"Degraded performance, increased energy costs, cloud billing spikes.","resolution":"Remove miners, patch entry points, monitor CPU usage.","lessons":["Attackers monetise access in many ways.","Cloud environments need billing alerts.","Browser-based mining is hard to detect."],"mitigations":["Monitor CPU/resource usage anomalies.","Cloud billing alerts and quotas.","Browser extensions to block mining scripts."],"origins":["na","eu","as"],"regions":["na","eu","as","sa","oc"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"zero-day-exchange","name":"Microsoft Exchange Zero-Days","year":2021,"type":["Web Application","Espionage"],"targets":"On-premises Microsoft Exchange servers","severity":"Critical","actors":"Hafnium (state-sponsored) and later multiple groups","vector":"Chained zero-day vulnerabilities (ProxyLogon) for remote code execution","impact":"Tens of thousands of Exchange servers compromised worldwide.","resolution":"Emergency patches, web shell removal, forensic investigation.","lessons":["On-prem email servers are high-value targets.","Mass exploitation follows zero-day disclosure.","Rapid patching saves organisations."],"mitigations":["Patch Exchange servers immediately.","Migrate to cloud email where feasible.","Web shell detection and monitoring."],"origins":["as"],"regions":["na","eu","as","oc"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"apt-solarwinds-follow","name":"Midnight Blizzard (Nobelium)","year":2024,"type":["Espionage","Phishing"],"targets":"Government agencies, NGOs, tech companies","severity":"High","actors":"Russian state-sponsored group (formerly Nobelium/APT29)","vector":"Password spray, OAuth app abuse, spear-phishing via Teams","impact":"Accessed email accounts of senior executives at major tech firms.","resolution":"Token revocation, enhanced monitoring, OAuth app audits.","lessons":["Identity attacks are evolving beyond passwords.","OAuth and app permissions are new attack surfaces.","Even security-mature firms get breached."],"mitigations":["Audit OAuth app permissions regularly.","Conditional access policies.","Monitor for password spray attacks."],"origins":["eu"],"regions":["na","eu"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"ransomware-healthcare","name":"Healthcare Ransomware Wave","year":2020,"type":["Ransomware"],"targets":"Hospitals and healthcare providers","severity":"Critical","actors":"Multiple ransomware groups (Ryuk, Conti)","vector":"Phishing emails + Trickbot/BazarLoader for initial access","impact":"Hospital systems locked during COVID-19; patient care disrupted.","resolution":"FBI alerts, sector-wide hardening, some ransom payments.","lessons":["Healthcare is a soft target with life-safety implications.","Attackers exploit crises for leverage.","Sector-wide threat intelligence is vital."],"mitigations":["Healthcare-specific incident response plans.","Segment medical devices from IT.","Immutable backups for critical systems."],"origins":["eu","as"],"regions":["na","eu"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"okta-breach","name":"Okta Support Breach","year":2023,"type":["Supply Chain","Phishing"],"targets":"Okta customers via stolen support credentials","severity":"High","actors":"Criminal threat actors","vector":"Stole Okta support system credentials to access customer HAR files containing session tokens","impact":"All Okta customer support users potentially affected.","resolution":"Session token revocation, credential rotation, support system hardened.","lessons":["Identity providers are crown-jewel targets.","Support systems have elevated access.","HAR files can contain sensitive tokens."],"mitigations":["Sanitise HAR files before sharing.","Monitor IdP admin actions closely.","Rotate all tokens after IdP incidents."],"origins":["na"],"regions":["na","eu","as"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."},
{"id":"deepfake-fraud","name":"Deepfake CEO Voice Fraud","year":2019,"type":["Phishing"],"targets":"Executives and finance departments","severity":"High","actors":"Sophisticated fraud group using AI voice cloning","vector":"AI-generated voice mimicking CEO to authorise wire transfer","impact":"$243,000 stolen in single incident; trend accelerating.","resolution":"Transfer reversed (partial), verification procedures updated.","lessons":["AI makes social engineering more convincing.","Voice verification alone is insufficient.","Multi-channel verification for financial transfers."],"mitigations":["Multi-person approval for large transfers.","Out-of-band verification for unusual requests.","Awareness training on deepfake threats."],"origins":["eu"],"regions":["eu","na"],"howItHappens":"Attackers exploit technical vulnerabilities (like missing patches) or human loopholes (like phishing) to gain unauthorized access.","whyItHappens":"Usually motivated by financial extortion, data theft, or service disruption.","howToStop":"Organizations stop the impact by isolating compromised systems, neutralizing the malware, and rotating compromised credentials.","futurePrevention":"They prevent recurrence by patching the exploited loophole, enforcing MFA, and conducting security awareness training."}
];

const feedbackItems = [];

// =====================
// Shared helpers
// =====================
function debounce(fn, delay) {
  let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), delay); };
}
function regionNameFromCode(c) {
  return { na: "North America", sa: "South America", eu: "Europe", af: "Africa", as: "Asia", me: "Middle East", oc: "Oceania" }[c] || c;
}
function getTypeIcon(types) {
  const t = (types || [])[0] || "";
  const m = { "Malware": "🦠", "Ransomware": "💰", "Phishing": "🎣", "Web Application": "🌐", "DDoS": "💥", "Supply Chain": "🔗", "Insider": "👤", "Espionage": "🕵️", "Social Engineering": "🎭" };
  return m[t] || "⚡";
}
// =====================
// Canvas particle background
// =====================
function initCanvas() {
    const canvas = document.getElementById("bgCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles = [];
    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener("resize", debounce(resize, 200));
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 2 + 0.5
        });
    }
    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(93,123,255,0.35)";
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        });
        ctx.strokeStyle = "rgba(93,123,255,0.06)";
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// =====================
// Navigation (SPA with transitions)
// =====================
function showPageById(id) {
    document.querySelectorAll(".page-section").forEach(s => {
        if (s.id === id) {
            s.classList.add("active-page");
            setTimeout(() => s.classList.add("visible"), 20);
        } else {
            s.classList.remove("visible");
            setTimeout(() => s.classList.remove("active-page"), 350);
        }
    });
    document.querySelectorAll(".nav-link").forEach(l => {
        const t = l.getAttribute("data-target");
        if (t === id) { l.classList.add("active"); l.setAttribute("aria-current", "page"); }
        else { l.classList.remove("active"); l.removeAttribute("aria-current"); }
    });
    const nav = document.getElementById("mainNav");
    const btn = document.getElementById("hamburgerBtn");
    if (nav) nav.classList.remove("open");
    if (btn) { btn.classList.remove("active"); btn.setAttribute("aria-expanded", "false"); }
    window.dispatchEvent(new Event("resize")); window.scrollTo({ top: 0, behavior: "smooth" });
}

function initNavigation() {
    document.querySelectorAll(".nav-link").forEach(l => {
        l.addEventListener("click", e => {
            e.preventDefault();
            const t = l.getAttribute("data-target");
            if (t) { showPageById(t); history.replaceState(null, "", "#" + t); }
        });
    });
    document.querySelectorAll("[data-go-to]").forEach(el => {
        el.addEventListener("click", () => {
            const t = el.getAttribute("data-go-to");
            if (t) { showPageById(t); history.replaceState(null, "", "#" + t); }
        });
    });
    window.addEventListener("hashchange", () => {
        const h = location.hash.replace("#", "");
        if (h) showPageById(h);
    });
    const initial = location.hash.replace("#", "") || "overview";
    showPageById(initial);
}

// =====================
// Hamburger menu
// =====================
function initHamburger() {
    const btn = document.getElementById("hamburgerBtn");
    const nav = document.getElementById("mainNav");
    if (!btn || !nav) return;
    btn.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        btn.classList.toggle("active");
        btn.setAttribute("aria-expanded", String(open));
    });
}

// =====================
// Theme toggle
// =====================
function initThemeToggle() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    const saved = localStorage.getItem("cyberHubTheme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    else if (window.matchMedia("(prefers-color-scheme: light)").matches)
        document.documentElement.setAttribute("data-theme", "light");
    btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("cyberHubTheme", next);
    });
}

// =====================
// Command palette (Ctrl+K)
// =====================
function initCommandPalette() {
    const overlay = document.getElementById("cmdOverlay");
    const input = document.getElementById("cmdInput");
    const results = document.getElementById("cmdResults");
    const hint = document.getElementById("cmdHint");
    if (!overlay || !input || !results) return;

    const sections = [
        { name: "Overview", type: "section", target: "overview" },
        { name: "Attack Library", type: "section", target: "attack-library" },
        { name: "Who & Why", type: "section", target: "actors-defenders" },
        { name: "Defence", type: "section", target: "defense" },
        { name: "Rankings", type: "section", target: "rankings" },
        { name: "Live View", type: "section", target: "live-map" },
        { name: "Attack Lifecycle", type: "section", target: "incident-response" },
        { name: "Contact & Chat", type: "section", target: "engage" },
        { name: "FAQ", type: "section", target: "faq" }
    ];

    function openPalette() {
        overlay.classList.add("open");
        input.value = "";
        input.focus();
        search("");
    }
    function closePalette() { overlay.classList.remove("open"); }

    function search(q) {
        const lower = q.toLowerCase().trim();
        let items = [];
        sections.forEach(s => {
            if (!lower || s.name.toLowerCase().includes(lower))
                items.push({ ...s, icon: "📄" });
        });
        attacks.forEach(a => {
            if (!lower || a.name.toLowerCase().includes(lower) || a.type.join(" ").toLowerCase().includes(lower))
                items.push({ name: a.name, type: "attack", target: "attack-library", icon: getTypeIcon(a.type), attackId: a.id });
        });
        if (items.length > 12) items = items.slice(0, 12);
        results.innerHTML = "";
        if (!items.length) {
            results.innerHTML = '<li class="cmd-empty">No results found</li>';
            return;
        }
        items.forEach((item, i) => {
            const li = document.createElement("li");
            if (i === 0) li.classList.add("selected");
            li.innerHTML = '<span>' + item.icon + '</span><span>' + item.name + '</span><span class="cmd-type">' + item.type + '</span>';
            li.addEventListener("click", () => {
                showPageById(item.target);
                history.replaceState(null, "", "#" + item.target);
                closePalette();
            });
            results.appendChild(li);
        });
    }

    document.addEventListener("keydown", e => {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); openPalette(); }
        if (e.key === "Escape") closePalette();
    });
    if (hint) hint.addEventListener("click", openPalette);
    overlay.addEventListener("click", e => { if (e.target === overlay) closePalette(); });
    input.addEventListener("input", () => search(input.value));
}

// =====================
// Attack rendering & filters
// =====================
let currentTypeFilter = "All";

function createAttackCard(attack, delay) {
    const card = document.createElement("article");
    card.className = "attack-card";
    card.dataset.attackId = attack.id;
    card.style.animationDelay = (delay * 0.04) + "s";

    const icon = getTypeIcon(attack.type);
    const yearText = attack.year && attack.year !== 0 ? String(attack.year) : "Ongoing";
    const sevLower = (attack.severity || "").toLowerCase();
    const sevClass = sevLower === "critical" ? "severity-critical" :
        sevLower === "high" ? "severity-high" :
            sevLower === "medium" ? "severity-medium" : "severity-low";
    const impactShort = attack.impact.length > 150 ? attack.impact.slice(0, 145) + "…" : attack.impact;

    card.innerHTML =
        '<div class="attack-type-icon">' + icon + '</div>' +
        '<div class="attack-header"><div class="attack-name">' + attack.name + '</div><div class="attack-year">' + yearText + '</div></div>' +
        '<div class="attack-meta-row"><span class="badge">' + attack.type.join(", ") + '</span><span class="badge ' + sevClass + '">' + (attack.severity || "Unknown") + '</span></div>' +
        '<p class="attack-impact-short">' + impactShort + '</p>' +
        '<button type="button" class="details-toggle"><span>Full details</span><span>▾</span></button>' +
        '<div class="attack-details">' +
        '<h4>Who does it</h4><p>' + attack.actors + '</p>' +
        '<h4>Why it happens</h4><p>' + (attack.whyItHappens || "Financial extortion, data theft, or service disruption.") + '</p>' +
        '<h4>How it happens (Loopholes)</h4><p>' + (attack.howItHappens || attack.vector) + '</p>' +
        '<h4>Impact & Damage</h4><p>' + attack.impact + '</p>' +
        '<h4>How organizations stop it</h4><p>' + (attack.howToStop || attack.resolution) + '</p>' +
        '<h4>Future prevention (Saving the org)</h4><p>' + (attack.futurePrevention || "Patch systems, enforce MFA, and maintain backups.") + '</p>' +
        (attack.lessons && attack.lessons.length ? '<h4>Key lessons</h4><ul>' + attack.lessons.map(function (l) { return "<li>" + l + "</li>"; }).join("") + '</ul>' : '') +
        (attack.mitigations && attack.mitigations.length ? '<h4>Mitigations</h4><ul>' + attack.mitigations.map(function (m) { return "<li>" + m + "</li>"; }).join("") + '</ul>' : '') +
        '</div>';

    const toggle = card.querySelector(".details-toggle");
    const details = card.querySelector(".attack-details");
    toggle.addEventListener("click", function () {
        const open = details.classList.toggle("open");
        toggle.querySelector("span:first-child").textContent = open ? "Hide details" : "Full details";
        toggle.querySelector("span:last-child").textContent = open ? "▴" : "▾";
    });

    card.addEventListener("mouseenter", function () {
        updateMapForAttack(attack);
        var l = document.getElementById("mapSelectedAttack");
        if (l) l.textContent = attack.name;
    });

    return card;
}

function renderAttacks(list) {
    var grid = document.getElementById("attackGrid");
    if (!grid) return;
    grid.innerHTML = "";
    list.forEach(function (a, i) { grid.appendChild(createAttackCard(a, i)); });
    var c = document.getElementById("attackResultCount");
    if (c) c.textContent = "Showing " + list.length + " attack" + (list.length === 1 ? "" : "s");
}

function filterAttacks() {
    var term = (document.getElementById("attackSearch") ? document.getElementById("attackSearch").value : "").trim().toLowerCase();
    var filtered = attacks.filter(function (a) {
        var fields = [a.name, a.targets, a.actors, a.vector, a.impact, a.resolution,
        a.year && a.year !== 0 ? String(a.year) : "",
        a.type ? a.type.join(" ") : "",
        a.lessons ? a.lessons.join(" ") : "",
        a.mitigations ? a.mitigations.join(" ") : ""].join(" ").toLowerCase();
        if (term && fields.indexOf(term) === -1) return false;
        if (currentTypeFilter === "All") return true;
        return a.type && a.type.some(function (t) { return t.toLowerCase() === currentTypeFilter.toLowerCase(); });
    });
    renderAttacks(filtered);
}

function initFilters() {
    var chips = document.getElementById("typeFilterChips");
    if (!chips) return;
    chips.addEventListener("click", function (e) {
        var t = e.target.closest(".chip");
        if (!t) return;
        currentTypeFilter = t.getAttribute("data-type") || "All";
        chips.querySelectorAll(".chip").forEach(function (c) {
            c.classList.toggle("active", c === t);
        });
        filterAttacks();
    });
    var search = document.getElementById("attackSearch");
    if (search) search.addEventListener("input", debounce(filterAttacks, 200));
}

// =====================
// Overview stats (animated count)
// =====================
function animateCount(el, target, duration) {
    var start = 0;
    var step = target / (duration / 16);
    function tick() {
        start += step;
        if (start >= target) { el.textContent = String(target); return; }
        el.textContent = String(Math.floor(start));
        requestAnimationFrame(tick);
    }
    tick();
}

function initOverviewStats() {
    var ac = document.getElementById("statAttackCount");
    var cc = document.getElementById("statCategoryCount");
    var fz = document.getElementById("statFromZero");
    if (ac) animateCount(ac, attacks.length, 800);
    var cats = new Set();
    attacks.forEach(function (a) { if (a.type) a.type.forEach(function (t) { cats.add(t); }); });
    if (cc) animateCount(cc, cats.size, 800);
    if (fz) fz.textContent = "0 → confident";
}

// =====================
// SVG Map & live feed
// =====================
function clearMapClasses() {
    document.querySelectorAll(".map-path").forEach(function (p) {
        p.classList.remove("origin", "affected", "origin-and-affected");
    });
}

function updateMapForAttack(attack) {
    clearMapClasses();
    var origins = attack.origins || [];
    var regions = attack.regions || [];
    document.querySelectorAll(".map-path").forEach(function (p) {
        var code = p.getAttribute("data-region");
        if (!code) return;
        var isO = origins.indexOf(code) !== -1;
        var isA = regions.indexOf(code) !== -1;
        if (isO && isA) p.classList.add("origin-and-affected");
        else if (isO) p.classList.add("origin");
        else if (isA) p.classList.add("affected");
    });
}

function applyRegionStatsToMap() {
    var codes = ["na", "sa", "eu", "af", "as", "me", "oc"];
    var stats = {};
    codes.forEach(function (c) { stats[c] = { o: 0, a: 0 }; });
    attacks.forEach(function (a) {
        if (a.origins) a.origins.forEach(function (c) { if (stats[c]) stats[c].o++; });
        if (a.regions) a.regions.forEach(function (c) { if (stats[c]) stats[c].a++; });
    });
    document.querySelectorAll(".map-path").forEach(function (p) {
        var code = p.getAttribute("data-region");
        if (!code || !stats[code]) return;
        var total = stats[code].o + stats[code].a;
        p.classList.remove("intensity-none", "intensity-low", "intensity-medium", "intensity-high");
        if (total === 0) p.classList.add("intensity-none");
        else if (total <= 3) p.classList.add("intensity-low");
        else if (total <= 6) p.classList.add("intensity-medium");
        else p.classList.add("intensity-high");
    });
}

function startLiveAttackFeed() {
    var candidates = attacks.filter(function (a) {
        return a.origins && a.origins.length && a.regions && a.regions.length;
    });
    if (!candidates.length) return;
    var idx = 0;

    function show(a) {
        var t = document.getElementById("liveAttackTitle");
        var r = document.getElementById("liveAttackRoute");
        var d = document.getElementById("liveAttackDetail");
        var m = document.getElementById("mapSelectedAttack");
        if (t) t.textContent = "🔴 LIVE: " + a.name;
        var origin = regionNameFromCode(a.origins[0]);
        var target = a.regions.length > 1 ? "Multiple regions" : regionNameFromCode(a.regions[0]);
        if (r) r.innerHTML = '<span style="color:#ff4b6a">'+origin+'</span> <span style="color:#5d7bff; font-weight:bold;">→</span> <span style="color:#38bdf8">'+target+'</span>';
        if (d) d.innerHTML = '<strong>Vector:</strong> ' + a.vector + '<br/><strong>Status:</strong> Active exploitation...';
        if (m) m.textContent = a.name + " (" + (Math.floor(Math.random() * 5000) + 100) + " hits/sec)";
        updateMapForAttack(a);
    }

    show(candidates[0]);
    setInterval(function () {
        idx = Math.floor(Math.random() * candidates.length);
        show(candidates[idx]);
    }, 2800); // Faster, more "live" feeling
}

// =====================
// Feedback (localStorage)
// =====================
function initFeedbackForm() {
    var form = document.getElementById("feedbackForm");
    if (!form) return;
    var status = document.getElementById("feedbackStatus");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var d = new FormData(form);
        var fb = {
            name: d.get("name") || "", email: d.get("email") || "",
            role: d.get("role") || "", rating: d.get("rating") || "5",
            feedback: d.get("feedback") || "", timestamp: new Date().toISOString()
        };
        feedbackItems.push(fb);
        try {
            var existing = JSON.parse(localStorage.getItem("cyberHubFeedback") || "[]");
            existing.push(fb);
            localStorage.setItem("cyberHubFeedback", JSON.stringify(existing));
        } catch (err) { /* ignore */ }
        fetch("/api/feedback", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fb)
        }).catch(function () { });
        if (status) {
            status.textContent = "✅ Thank you! Your feedback has been saved.";
            setTimeout(function () { status.textContent = ""; }, 5000);
        }
        form.reset();
        document.querySelectorAll("#starRating .star").forEach(function (s, i) {
            s.classList.toggle("active", i < 5);
        });
        document.getElementById("fbRating").value = "5";
    });
}

// =====================
// Star rating
// =====================
function initStarRating() {
    var container = document.getElementById("starRating");
    var hidden = document.getElementById("fbRating");
    if (!container || !hidden) return;
    container.addEventListener("click", function (e) {
        var star = e.target.closest(".star");
        if (!star) return;
        var val = parseInt(star.dataset.value);
        hidden.value = String(val);
        container.querySelectorAll(".star").forEach(function (s) {
            s.classList.toggle("active", parseInt(s.dataset.value) <= val);
        });
    });
}

// =====================
// Chat assistant
// =====================
function addChatMessage(text, sender) {
    var c = document.getElementById("chatMessages");
    if (!c) return;
    var b = document.createElement("div");
    b.className = "chat-message " + sender;
    b.textContent = text;
    c.appendChild(b);
    c.scrollTop = c.scrollHeight;
}

function generateChatReply(msg) {
    var input = msg.toLowerCase().trim();
    if (!input) return "Ask me about specific attacks, attack types, or how to defend your organisation.";
    for (var i = 0; i < attacks.length; i++) {
        var a = attacks[i];
        if (input.indexOf(a.name.toLowerCase()) !== -1 || input.indexOf(a.id) !== -1) {
            var mit = a.mitigations && a.mitigations[0] ? a.mitigations[0] : "Apply layered controls.";
            return a.name + ": " + a.vector + ". Impact: " + a.impact + " Key mitigation: " + mit;
        }
    }
    var keywords = {
        ransomware: "Ransomware encrypts files and demands payment. Best defences: strong backups, MFA, rapid patching, endpoint detection.",
        phishing: "Phishing tricks people with convincing messages. Combine email filtering, awareness training, and phishing-resistant MFA.",
        ddos: "DDoS floods services with traffic. Use CDNs, DDoS protection, rate limiting, and resilient architectures.",
        "sql injection": "SQL injection abuses unsafe queries. Use parameterised queries, input validation, and least privilege on DB accounts.",
        xss: "XSS injects scripts into web pages. Defence: output encoding, input validation, and Content Security Policy.",
        malware: "Malware is malicious software. EDR, application whitelisting, and patching are key defences.",
        insider: "Insider threats involve misuse of legitimate access. Least privilege, monitoring, and clear policies help.",
        "supply chain": "Supply-chain attacks compromise trusted vendors. Use SBOMs, dependency scanning, and supplier assessments.",
        defend: "Start with basics: patch, enable MFA, back up data, segment networks, and monitor logs.",
        deepfake: "Deepfakes use AI for impersonation. Use multi-person approval and out-of-band verification.",
        cloud: "Cloud security requires posture management, identity controls, and monitoring."
    };
    for (var key in keywords) {
        if (input.indexOf(key) !== -1) return keywords[key];
    }
    return "I'm an AI assistant for this hub. Ask about attack types, specific incidents, or defensive strategies. 🛡️";
}

function initChatAssistant() {
    var inputEl = document.getElementById("chatInput");
    var sendBtn = document.getElementById("chatSend");
    if (!inputEl || !sendBtn) return;
    addChatMessage("Welcome to the Cyber Attack Knowledge Hub! Ask me about any attack type, a specific incident, or how to defend your organisation. 🛡️", "assistant");
    function handle() {
        var text = inputEl.value.trim();
        if (!text) return;
        addChatMessage(text, "user");
        inputEl.value = "";
        var reply = generateChatReply(text);
        setTimeout(function () { addChatMessage(reply, "assistant"); }, 300);
    }
    sendBtn.addEventListener("click", handle);
    inputEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); handle(); }
    });
}

// =====================
// Back to top
// =====================
function initBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;
    window.addEventListener("scroll", debounce(function () {
        btn.classList.toggle("visible", window.scrollY > 300);
    }, 100));
    btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// =====================
// Bootstrap
// =====================
document.addEventListener("DOMContentLoaded", function () {
    try {
        initCanvas();
        initThemeToggle();
        initHamburger();
        initNavigation();
        initCommandPalette();
        initOverviewStats();
        renderAttacks(attacks);
        initFilters();
        initStarRating();
        startLiveAttackFeed();
        initFeedbackForm();
        initChatAssistant();
        initBackToTop();
        applyRegionStatsToMap();
        var def = attacks.find(function (a) { return a.origins && a.origins.length && a.regions && a.regions.length; }) || attacks[0];
        if (def) {
            updateMapForAttack(def);
            var l = document.getElementById("mapSelectedAttack");
            if (l) l.textContent = def.name;
        }
    } catch (err) {
        console.error("Init error:", err);
    }
});
