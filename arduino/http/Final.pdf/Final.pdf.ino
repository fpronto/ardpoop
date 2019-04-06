// Demo using DHCP and DNS to perform a web client request.
// 2011-06-08 <jc@wippler.nl>
//
// License: GPLv2

#include <EtherCard.h>

// ethernet interface mac address, must be unique on the LAN
static byte mymac[] = { 0x74,0x69,0x69,0x2D,0x30,0x31 };

byte Ethernet::buffer[700];
static uint32_t timerOpen;
static uint32_t timerClose;
static uint32_t timerUser;

static uint32_t timerUse;
static uint32_t timerUse2;

const char website[] PROGMEM = "10.132.167.212";

// called when the client request is complete
static void my_callback (byte status, word off, word len) {
  Serial.println(">>>");
  Ethernet::buffer[off+300] = 0;
  Serial.print((const char*) Ethernet::buffer + off);
  Serial.println("...");
}

static void open () {
  ether.packetLoop(ether.packetReceive());
  if (millis() > timerOpen) {
    timerOpen = millis() + 500;
    Serial.println("<<< OPEN ");
    ether.browseUrl(PSTR("/api/v1/open"), "", website, my_callback);
  }
}

static void close () {
   ether.packetLoop(ether.packetReceive());
  if (millis() > timerClose) {
    timerClose = millis() + 500;
    Serial.println("<<< CLOSE ");
    ether.browseUrl(PSTR("/api/v1/close"), "", website, my_callback);
  }
}

static void smell (int smelly) {
  ether.packetLoop(ether.packetReceive());
  if (millis() > timerClose) {
    timerClose = millis() + 500;
    Serial.println("<<< SMELL ");
    char message[50];
    sprintf(message, "?val=%d", smelly); 
    ether.browseUrl(PSTR("/api/v1/smell"), message, website, my_callback);
  }
}

static void user (char* smellyUser) {
  ether.packetLoop(ether.packetReceive());
  if (millis() > timerUser) {
    timerUser = millis() + 500;
    Serial.print("<<< USER ");
    char message[50] = "";
    strcat(message, "?id=");
    strcat(message, smellyUser);
    Serial.println(message);

    ether.browseUrl(PSTR("/api/v1/user"), message, website, my_callback);
  }
}

void setup () {
  Serial.begin(57600);
  Serial.println(F("\n[webClient]"));

  // Change 'SS' to your Slave Select pin, if you arn't using the default pin
  if (ether.begin(sizeof Ethernet::buffer, mymac, 53) == 0)
    Serial.println(F("Failed to access Ethernet controller"));
  if (!ether.dhcpSetup())
    Serial.println(F("DHCP failed"));

  ether.printIp("IP:  ", ether.myip);
  ether.printIp("GW:  ", ether.gwip);
  ether.printIp("DNS: ", ether.dnsip);

  // if website is a string containing an IP address instead of a domain name,
  // then use it directly. Note: the string can not be in PROGMEM.
  char websiteIP[] = "10.132.167.212";
  ether.parseIp(ether.hisip, websiteIP);
  ether.hisport = 3000;
}

void loop () {
    smell(80);
    close();
    if (millis() > timerUse) {
      timerUse = millis() + 1000;
      user("123");
    };
    if (millis() > timerUse2) {
      timerUse2 = millis() + 10000;
      open();
    };
}
