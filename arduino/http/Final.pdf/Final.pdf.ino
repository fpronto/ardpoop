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
static uint32_t smellingTimer;

static int baseDistance = 0;
static int moveCounter = 0;
static int noMoveCounter = 0;

static bool config = true;
static bool inUse = false;
static bool sendingSmell = false;

// defines pins numbers
const int trigPin = 9;
const int echoPin = 10;

// defines variables
long duration;
int distance;

const char website[] PROGMEM = "meiopau.com";

static void close_callback (byte status, word off, word len) {
  Serial.println(">>>");
  Ethernet::buffer[off+300] = 0;
  Serial.print((const char*) Ethernet::buffer + off);
  Serial.println("...");
  inUse = true;
}

static void open_callback (byte status, word off, word len) {
  Serial.println(">>>");
  Ethernet::buffer[off+300] = 0;
  Serial.print((const char*) Ethernet::buffer + off);
  Serial.println("...");
  inUse = false;
}

static void my_callback (byte status, word off, word len) {
  Serial.println(">>>");
  Ethernet::buffer[off+300] = 0;
  Serial.print((const char*) Ethernet::buffer + off);
  Serial.println("...");
}

static void smell_callback (byte status, word off, word len) {
  Serial.println(">>>");
  Ethernet::buffer[off+300] = 0;
  Serial.print((const char*) Ethernet::buffer + off);
  Serial.println("...");
  sendingSmell = false;
}

static void open () {
  while(inUse) {
    ether.packetLoop(ether.packetReceive());
    if (millis() > timerOpen) {
      timerOpen = millis() + 500;
      Serial.println("<<< OPEN ");
      ether.browseUrl(PSTR("/api/v1/open"), "", website, open_callback);
    }
  }
}

static void close () {
  while(!inUse) {
    ether.packetLoop(ether.packetReceive());
      if (millis() > timerClose) {
        timerClose = millis() + 500;
        Serial.println("<<< CLOSE ");
        ether.browseUrl(PSTR("/api/v1/close"), "", website, close_callback);
      }
  }
}

static void smell (int smelly) {
  while(sendingSmell) {
    ether.packetLoop(ether.packetReceive());
    if (millis() > timerClose) {
      timerClose = millis() + 500;
      Serial.println("<<< SMELL ");
      char message[50];
      sprintf(message, "?val=%d", smelly); 
      ether.browseUrl(PSTR("/api/v1/smell"), message, website, smell_callback);
    }
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
  digitalWrite(trigPin, LOW);
  delay(2);
  digitalWrite(trigPin, HIGH);
  delay(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance= duration*0.034/2; 
  int min = baseDistance - 5;
  int max = baseDistance + 5;
  if (distance <= min || distance >= max) {
    moveCounter++;
    noMoveCounter = 0;
    if(moveCounter >= 50) {
      if(inUse == false){
         Serial.println("Vamos fechar");
         close();
         inUse = true;
      }
      moveCounter = 0;
    }
  }else {
    moveCounter = 0;
    noMoveCounter++;
    if(noMoveCounter >= 50) {
      if(inUse == true){
         Serial.println("Vamos abrir");
         open();
         inUse = false;
      }
      noMoveCounter = 0;
    }
  } 
};

void configBaseDistance(){
  int counter = 0;
  while(counter != 100) {
    digitalWrite(11, HIGH);
    digitalWrite(trigPin, LOW);
    delay(2);
    digitalWrite(trigPin, HIGH);
    delay(10);
    digitalWrite(trigPin, LOW);
    duration = pulseIn(echoPin, HIGH);
    distance= duration*0.034/2;
    int min = baseDistance - 5;
    int max = baseDistance + 5;
    if (distance >= min && distance <= max) {
      counter++;
    }else {
      counter = 0;
      baseDistance = distance;
    }
  }
}

void smellSmell() {
 if (millis() > smellingTimer) {
    smellingTimer = millis() + 1000;
    int sensorValue;
    sensorValue = analogRead(A0);
    sendingSmell= true;
    smell(sensorValue);
 }
}

void setup () {
  Serial.begin(57600);
  Serial.println(F("\n[webClient]"));
  pinMode(trigPin, OUTPUT);  // Sets the trigPin as an Output
  pinMode(echoPin, INPUT);   // Sets the echoPin as an Input
  pinMode(11, OUTPUT);

  if (ether.begin(sizeof Ethernet::buffer, mymac, 53) == 0)
    Serial.println(F("Failed to access Ethernet controller"));
  if (!ether.dhcpSetup())
    Serial.println(F("DHCP failed"));

  ether.printIp("IP:  ", ether.myip);
  ether.printIp("GW:  ", ether.gwip);
  ether.printIp("DNS: ", ether.dnsip);

  //char websiteIP[] = "10.132.167.213";
  //ether.parseIp(ether.hisip, websiteIP);
  //ether.hisport = 9000;
  if (!ether.dnsLookup(website))
    Serial.println("DNS failed");
  
}



void loop () {
  if (config) {
      configBaseDistance();
      config = false;
      Serial.println("CONFIGURADO:");
      Serial.print("Base Distance: ");
      Serial.println(baseDistance);
      digitalWrite(11, LOW);
  }else {
    smellSmell();
    readDistance();
  }
}
