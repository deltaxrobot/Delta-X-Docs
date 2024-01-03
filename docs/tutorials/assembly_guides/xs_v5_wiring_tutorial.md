# DELTA X S INPUT/OUTPUT WIRING TUTORIALS

This document provides a comprehensive guide for wiring the Delta X S robot, focusing on the Input and Output connections. Ensure that you follow these instructions carefully to achieve optimal performance and prevent any potential issues.

## Digital Input(PNP) and Analog Input Wiring

### Input Terminal Block (DB9 Male):

**Digital INPUT port pins (24VDC/3mA) & Analog input pins (0-10VDC/0-4096):**

![input_ter](https://raw.githubusercontent.com/deltaxrobot/Delta-X-Docs/master/docs/images/assembly/xs_v5/InputTerminal.png)

### Wiring Steps

- Connect Digital Input (I0 to I3):
    - Connect the positive (+) side of your PNP sensor to one of the I0 to I3 pins.
    - Connect the negative (-) side of your PNP sensor to the GND pin corresponding to the chosen I0 to I3 pin.

- Connect Analog Input (A0 and A1):
    - Connect the positive (+) side of your analog sensor to either A0 or A1.
    - Connect the negative (-) side of your analog sensor to the GND pin corresponding to the chosen A0 or A1 pin.

- Power Supply (24V):
    - Connect the positive (+) side of the 24V power source to the 24V pin (Pin 8).
    - Connect the negative (-) side of the power source to the GND pin (Pin 9).

### Input Breakout Terminal Board Pinout.

![input_breakout](https://raw.githubusercontent.com/deltaxrobot/Delta-X-Docs/master/docs/images/assembly/xs_v5/InputWiring.png)

