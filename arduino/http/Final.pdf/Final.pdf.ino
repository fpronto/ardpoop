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
static uint32_t timerConfig;

static int configDistance = 0;
static bool config = true;

// defines pins numbers
const int trigPin = 9;
const int echoPin = 10;

// defines variables
long duration;
int distance;

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

void readDistance() {
 // Clears the trigPin
digitalWrite(trigPin, LOW);
delay(2);
// Sets the trigPin on HIGH state for 10 micro seconds
digitalWrite(trigPin, HIGH);
delay(10);
digitalWrite(trigPin, LOW);
// Reads the echoPin, returns the sound wave travel time in microseconds
duration = pulseIn(echoPin, HIGH);
// Calculating the distance
distance= duration*0.034/2;
// Prints the distance on the Serial Monitor
Serial.print("Distance: ");
Serial.println(distance);
}

void configBaseDistance(){
  for(int i = 0; i < 100; i++) {
    digitalWrite(trigPin, LOW);
    delay(2);
    digitalWrite(trigPin, HIGH);
    delay(10);
    digitalWrite(trigPin, LOW);
    duration = pulseIn(echoPin, HIGH);
    distance= duration*0.034/2;
    Serial.print("Distance: ");
    Serial.println(distance);
  }
}

void setup () {
  Serial.begin(57600);
  Serial.println(F("\n[webClient]"));

  pinMode(trigPin, OUTPUT);  // Sets the trigPin as an Output
  pinMode(echoPin, INPUT);   // Sets the echoPin as an Input
  
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
  if (config) {
      configBaseDistance();
      config = false;
  }else {
  }
}
