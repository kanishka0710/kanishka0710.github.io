---
title: NOMA
timestamp: 2026-01-13T07:22:03.000Z
category: wireless
subcategory: multiple-access
tags: [wireless, noma, multiple-access]
description: NOMA-PC, NOMA-SIC for Uplink and Downlink
toc: true
draft: false
---

Let's first start by defining the theoretical maximum uplink spectral efficiency for two users:

$$
R_1/B + R_2/B \le C_\Sigma = \log_2(1 + SNR_1 + SNR_2)
$$

If we start by assuming both users transmit at the same time across the same bandwidth, we get:

$$
R_1/B = \log_2(1 + \frac{SNR_1}{1 + SNR_2}), \quad R_2/B = \log_2(1 + \frac{SNR_2}{1 + SNR_1})
$$

This scheme isn't very good since it requires:

$$
SNR_1 \gg \frac{SNR_1}{1 + SNR_2}, \quad SNR_2 \gg \frac{SNR_2}{1 + SNR_1}
$$

Both conditions cannot be simultaneously met. 

**In the Downlink**, the spectral efficiencies become:

$$
R_1/B = \log_2(1 + \frac{P_1 * SNR_1}{1 + P_2 * SNR_2}), \quad R_2/B = \log_2(1 + \frac{P_2 * SNR_2}{1 + P_1 * SNR_1})
$$

#### NOMA-PC (NOMA Power Control)
NOMA-PC describes a method where users employ power control. Let $P_1, P_2 \in [0, 1]$ be the fraction of transmit power for each user.

$$
y = \sqrt{P_1 * SNR_1}x_1 + \sqrt{P_2 * SNR_2}x_2 + v, \quad v \sim \mathcal{N}(0, 1)
$$

In this case, the user's spectral efficiencies are in the form:

$$
R_1/B = \log_2(1 + \frac{P_1 * SNR_1}{1 + P_2*SNR_2})
$$

This performs worse than TDMA and FDMA. So how can we achieve the theoretical sum capacity with NOMA?

#### NOMA-SIC - Uplink
The sum-capacity can be achieved through successive interference cancellation (SIC). For this to work, User 2 **must** transmit at a rate not exceeding $\log_2(1 + \frac{SNR_2}{1 + SNR_1})$. 

If we decode user 2 first, and then user 1 and apply SIC, we get the following spectral efficiencies:

$$
R_1/B = \log_2(1 + SNR_1), \quad R_2/B = \log_2(1 + \frac{SNR_2}{1 + SNR_1})
$$

If we switch the decoding order, the spectral efficiencies just flip too. 

#### NOMA-SIC - Downlink
In the downlink, SIC is only possible at the user with the higher SNR. For example, if $SNR_1 > SNR_2$, we can perform SIC at user 1, but not at user 2. If User 1 can reliably decode its message, it can also decoder user 2's message.
